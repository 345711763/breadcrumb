const {FILE, DIR} = require('../constants/path');
const PathInfo = require('../model/PathInfo');
// fake data
let root = {
  type: "dir",
  children: {
    home: {
      type: "dir",
      children: {
        myname: {
          type: "dir",
          children: {
            "filea.txt": {
              type: "file",
            },
            "fileb.txt": {
              type: "file",
            },
            "projects": {
              type: "dir",
              children: {
                mysupersecretproject: {
                  type: "dir",
                  children: {
                    mysupersecretfile: {
                      type: "file",
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
// Helper functions
const subRootContainsName = (name, subRoot) => Object.prototype.hasOwnProperty.call(subRoot.children, name);
const formatChildrenOfCurrentPath = (dir) =>
  Object
    .keys(dir.children)
    .reduce((acc, key) => {
      acc[key] = {type: dir.children[key].type};
      return acc;
    }, {});

const getPathInfo = (path) => {
  // dealing root path
  if (path === '/') {
    return new PathInfo(root.type, formatChildrenOfCurrentPath(root));
  }
  const pathArray = path.split('/');
  let subRoot = {...root};
  let i = 1;
  while (i < pathArray.length) {
    let currentNodeName = pathArray[i];
    if (i === pathArray.length - 1 && subRootContainsName(currentNodeName, subRoot)) {
      const current = subRoot.children[currentNodeName];
      // if path is a file, returns the metadata (name and type) of the file
      if (current.type === FILE) {
        return new PathInfo(current.type, null);
      }
      // if path is a dir, returns the files or subdirectories in the dir,
      // and their types, as well as the metadata (name and type) of the current directory
      if (current.type === DIR) {
        return new PathInfo(current.type, formatChildrenOfCurrentPath(current))
      }
    }
    subRoot = {
      ...subRoot.children[currentNodeName],
    };
    i++;
  }
  return null;
}

module.exports = {
  getPathInfo,
}
