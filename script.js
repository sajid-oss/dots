// PDF Merge Logic
async function mergePDFs() {
    const { PDFDocument } = PDFLib; // Library load honi chahiye
    const input = document.getElementById('pdfInput');
    
    if (input.files.length < 2) {
        alert("Kam se kam 2 files select karein!");
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
