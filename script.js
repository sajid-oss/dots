// 1. Image to PDF Logic
function convertImageToPDF() {
    const { jsPDF } = window.jspdf;
    const input = document.getElementById('imageInput');
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const doc = new jsPDF();
            doc.addImage(e.target.result, 'JPEG', 10, 10, 180, 150);
            doc.save("Pageup-Converted.pdf");
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        alert("Pehle image select karein!");
    }
}

// 2. Merge PDF Logic
async function mergePDFs() {
    const { PDFDocument } = PDFLib;
    const input = document.getElementById('pdfInput');
    
    if (input.files.length < 2) {
        alert("Kam se kam 2 PDF files select karein!");
        return;
    }

    const mergedPdf = await PDFDocument.create();
    for (let file of input.files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
    }
    
    const pdfBytes = await mergedPdf.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "Pageup-Merged.pdf";
    link.click();
}
