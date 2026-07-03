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
}document.getElementById('cta-btn').addEventListener('click', () => {
    alert('Welcome to our premium service!');
});