/**
 * Service class for Google Drive operations
 */
class DriveService {
  /**
   * Get a folder by its ID
   * @param {string} folderId - The ID of the folder
   * @return {GoogleAppsScript.Drive.Folder} The folder object
   */
  getFolderById(folderId: string): GoogleAppsScript.Drive.Folder {
    return DriveApp.getFolderById(folderId);
  }

  /**
   * Get files in a folder by name
   * @param {GoogleAppsScript.Drive.Folder} folder - The folder to search in
   * @param {string} fileName - The name of the file to find
   * @return {GoogleAppsScript.Drive.FileIterator} Iterator of matching files
   */
  getFilesByName(folder: GoogleAppsScript.Drive.Folder, fileName: string): GoogleAppsScript.Drive.FileIterator {
    return folder.getFilesByName(fileName);
  }

  /**
   * Get all files in a folder
   * @param {GoogleAppsScript.Drive.Folder} folder - The folder to get files from
   * @return {GoogleAppsScript.Drive.FileIterator} Iterator of files
   */
  getFiles(folder: GoogleAppsScript.Drive.Folder): GoogleAppsScript.Drive.FileIterator {
    return folder.getFiles();
  }

  /**
   * Get all files in a folder and its subfolders recursively
   * @param {GoogleAppsScript.Drive.Folder} folder - The folder to search files in
   * @param {string} [path=''] - The current path (used internally for recursion)
   * @return {Array<{ file: GoogleAppsScript.Drive.File, path: string }>} Array of objects containing file and path information
   */
  getFilesRecursively(folder: GoogleAppsScript.Drive.Folder, path: string = ""): Array<{ file: GoogleAppsScript.Drive.File, path: string }> {
    const folderName = folder.getName();
    const currentPath = path ? `${path}/${folderName}` : folderName;
    const result: Array<{ file: GoogleAppsScript.Drive.File, path: string }> = [];

    // Get files in current folder
    const files = folder.getFiles();
    while (files.hasNext()) {
      const file = files.next();
      result.push({
        file: file,
        path: currentPath,
      });
    }

    // Get subfolders and recursively get their files
    const subFolders = folder.getFolders();
    while (subFolders.hasNext()) {
      const subFolder = subFolders.next();
      const subFolderFiles = this.getFilesRecursively(subFolder, currentPath);
      result.push(...subFolderFiles);
    }

    return result;
  }

  /**
   * Get all subfolders in a folder
   * @param {GoogleAppsScript.Drive.Folder} folder - The folder to get subfolders from
   * @return {GoogleAppsScript.Drive.FolderIterator} Iterator of folders
   */
  getFolders(folder: GoogleAppsScript.Drive.Folder): GoogleAppsScript.Drive.FolderIterator {
    return folder.getFolders();
  }

  /**
   * Move a file to a specified folder
   * @param {GoogleAppsScript.Drive.File} file - The file to move
   * @param {GoogleAppsScript.Drive.Folder} folder - The destination folder
   * @return {GoogleAppsScript.Drive.File} The moved file
   */
  moveFileToFolder(file: GoogleAppsScript.Drive.File, folder: GoogleAppsScript.Drive.Folder): GoogleAppsScript.Drive.File {
    return file.moveTo(folder);
  }

  /**
   * Get a file by its ID
   * @param {string} fileId - The ID of the file
   * @return {GoogleAppsScript.Drive.File} The file object
   */
  getFileById(fileId: string): GoogleAppsScript.Drive.File {
    return DriveApp.getFileById(fileId);
  }
}

// Export as singleton
const driveService = new DriveService();
export default driveService;
