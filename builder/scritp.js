
async function compressImage(file) {
   const maxWidth = 900; // İstediğiniz maksimum genişlik
   const maxHeight = 700; // İstediğiniz maksimum yükseklik

   const img = document.createElement("img");
   const reader = new FileReader();

   return new Promise((resolve, reject) => {
       reader.onload = function (e) {
           img.onload = function () {
               const canvas = document.createElement("canvas");
               const ctx = canvas.getContext("2d");

               let width = img.width;
               let height = img.height;

               if (width > height) {
                   if (width > maxWidth) {
                       height *= maxWidth / width;
                       width = maxWidth;
                   }
               } else {
                   if (height > maxHeight) {
                       width *= maxHeight / height;
                       height = maxHeight;
                   }
               }

               canvas.width = width;
               canvas.height = height;

               ctx.drawImage(img, 0, 0, width, height);

               canvas.toBlob(
                   (blob) => {
                       resolve(blob);
                   },
                   file.type,
                   0.8 // Resim kalitesi (0 ile 1 arasında, 1 en yüksek kalite)
               );
           };

           img.src = e.target.result;
       };

       reader.readAsDataURL(file);
   });
}

   
async function compressAndDownload() {
    const fileInput = document.getElementById("fileInput");
    const files = fileInput.files;

    if (files.length === 0) {
        alert("Lütfen bir veya daha fazla dosya seçin.");
        return;
    }

    const compressedFiles = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const compressedFile = await compressImage(file);
        compressedFiles.push({ name: file.name, file: compressedFile });

        // Durum göstergesi güncelleme
        const progress = Math.floor((i + 1) / files.length * 100);
        updateProgressBar(progress);
    }

    // Dosyaları zip dosyasına ekleyip indirme işlemi
    const zip = new JSZip();

    for (const item of compressedFiles) {
        zip.file(item.name, item.file, { binary: true });
    }

    zip.generateAsync({ type: "blob" })
        .then((blob) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "compressed_files.zip";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Durum göstergesini sıfırla
            updateProgressBar(0);
        });
}

function updateProgressBar(progress) {
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");

    progressBar.style.width = `${progress}%`;
    progressText.innerText = `${progress}%`;
}



   // Dosya sürükle-bırak olaylarını dinle
   const dropArea = document.getElementById("dropArea");
   
   dropArea.addEventListener("dragover", function (e) {
       e.preventDefault();
       dropArea.classList.add("dragover");
   });
   
   dropArea.addEventListener("dragleave", function () {
       dropArea.classList.remove("dragover");
   });
   
   dropArea.addEventListener("drop", function (e) {
       e.preventDefault();
       dropArea.classList.remove("dragover");
   
       const files = e.dataTransfer.files;
       handleFiles(files);
   });
   
   function handleFiles(files) {
       const fileInput = document.getElementById("fileInput");
       fileInput.files = files;
   
       // Dosyaları gösterme veya işleme başlama gibi ek işlemler burada eklenebilir
   
       // Örneğin, dosyaların isimlerini gösterme:
       const fileNames = Array.from(files).map(file => file.name).join(', ');
       alert(`Seçilen dosyalar: ${fileNames}`);
   }

   