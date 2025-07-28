import { unlink } from "fs";
export default function deleteFile(filePath) {
    return unlink(filePath, (err) => {
        if (err) {
            console.log("Ovo je error ", err);
        }
        else {
            console.log("Slika uspesno obrisana =>", filePath);
        }
    });
}
