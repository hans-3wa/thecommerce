import path from "path";
import fs from "fs"

export const copyFiles = (files, pathName) => {

    const promises = files.map((file) => {
        return new Promise((resolve, reject) => {
            const timestamp = new Date().getTime();
            const newPath = `${pathName}/${timestamp}${(Math.random() + 1).toString(36).substring(7)}${path.extname(file.originalFilename)}`;
            fs.copyFile(file.filepath, `public/${newPath}`, (err) => {
                if (err) reject(err)
                else resolve(newPath);
            });
        });
    });
    return Promise.all(promises);
};

export const slugify = (text) => {
    return text
        .toString()                   // Cast to string (optional)
        .normalize('NFKD')// The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()                // Convert the string to lowercase letters
        .trim()                       // Remove whitespace from both sides of a string (optional)
        .replace(/\s+/g, '-')         // Replace spaces with -
        .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
        .replace(/\_/g, '-')           // Replace _ with -
        .replace(/\-\-+/g, '-')       // Replace multiple - with single -
        .replace(/\-$/g, '');         // Remove trailing -
}