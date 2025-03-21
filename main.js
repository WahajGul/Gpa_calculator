const marksInput = Array.from( document.querySelectorAll(".marksInput"));
const calcBtn = document.querySelector(".calcBtn");
const form = document.querySelector(".form-marks");
const errorP = document.querySelector(".error")
const gpaRes = document.querySelector(".gpa-res")
const gradeRes = document.querySelector(".grade-res")
const percRes = document.querySelector(".perc-res")

const pdfForm=document.querySelector(".pdf-form");
const nameInput = document.querySelector(".name-input").value;
const idInput = document.querySelector(".id-input").value;
const sectionInput = document.querySelector(".section-input").value;

const pfCH = parseInt(document.querySelector(".pf-ch").value); 

const genPdfBtn = document.querySelector("pdf-g")

let ds,fe,pf,pfLab,ict,ictLab,calc;
let totalGpa=0,totalPercentage=0,Grade="";
const marks = []
console.log(marksInput)


marksInput.forEach((item) => {
    item.addEventListener('input', (e) => {  // Changed to 'input' event
        const value = +e.target.value || 0;
        
        // Validate input range
        if(value < 0 || value > 100) {
            e.target.classList.add('invalid');
            return;
        }
        
        e.target.classList.remove('invalid');
        
        // Update subject marks
        if(e.target.className.includes("DS-input")) ds = value;
        if(e.target.className.includes("FE-input")) fe = value;
        if(e.target.className.includes("PF-input")) pf = value;
        if(e.target.className.includes("PF-lab-input")) pfLab = value;
        if(e.target.className.includes("ICT-input")) ict = value;
        if(e.target.className.includes("ICT-lab-input")) ictLab = value;
        if(e.target.className.includes("CALC-input")) calc = value;
    });
});

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    // Reset error message
    errorP.textContent = "";

    // Validate inputs
    if(!ds || !fe || !pf || !pfLab || !ict || !ictLab || !calc || !pfCH) {
        errorP.textContent = "One or more inputs are empty";
        return;
    }

    if(isNaN(ds) || isNaN(fe) || isNaN(pf) || isNaN(pfLab) || 
       isNaN(ict) || isNaN(ictLab) || isNaN(calc) || isNaN(pfCH) ) {
        errorP.textContent = "Invalid input detected";
        return;
    }

    // Calculate GPA
    let totalGp = (calcGrade(ds,100).point * 3.0) +
                  (calcGrade(fe,100).point * 3.0) +
                  (calcGrade(ict,100).point * 2.00) +
                  (calcGrade(ictLab,50).point * 1.00) +
                  (calcGrade(pf,100).point * 3.00) +
                  (calcGrade(pfLab,50).point * pfCH) +
                  (calcGrade(calc,100).point * 3.0);

    totalGpa = totalGp / 17.00;
    gpaRes.textContent = "GPA  : " + totalGpa.toFixed(2); // Show 2 decimal places

    totalPercentage=((ds+fe+pf+pfLab+ict+ictLab+calc)/600)*100
    percRes.textContent= "Percentage : "+totalPercentage.toFixed(2)+"%"

    Grade=calcGrade((ds+fe+pf+pfLab+ict+ictLab+calc),600).grade
    gradeRes.textContent= "Grade : "+Grade
    // Clear inputs
    marksInput.forEach((o) => o.value = "");
    marks[0] = ds
    marks[1]= fe
    marks[2]= ict
    marks[3]=ictLab
    marks[4]= pf
    marks[5]= pfLab
    marks[6]= calc
    // Reset variables
    ds = fe = pf = pfLab = ict = ictLab = calc = undefined;
});







const calcGrade = (marks, total) => {
    const p = (marks / total) * 100;
    const result = {
        point: 0.00,
        grade: "F"
    };

    if (p >= 91) {
        result.grade = "A";
        result.point = 4.0;
    } else if (p >= 80) {
        result.grade = "A-";
        result.point = 3.7;
    } else if (p >= 75) {
        result.grade = "B+";
        result.point = 3.3;
    } else if (p >= 71) {
        result.grade = "B";
        result.point = 3.0;
    } else if (p >= 68) {
        result.grade = "B-";
        result.point = 2.7;
    } else if (p >= 64) {
        result.grade = "C+";
        result.point = 2.3;
    } else if (p >= 61) {
        result.grade = "C";
        result.point = 2.0;
    } else if (p >= 58) {
        result.grade = "C-";
        result.point = 1.7;
    } else if (p >= 54) {
        result.grade = "D+";
        result.point = 1.3;
    } else if (p >= 50) {
        result.grade = "D";
        result.point = 1.0;
    }
    // Below 50% remains "F" with 0.00 points

    return result;
};






pdfForm.addEventListener('submit',(e)=>{
    e.preventDefault()
if(  nameInput.trim() =="" || !nameInput  ){
        document.querySelector(".name-error").textContent="Invalid Name"
return
    }

if(  !idInput.includes("CSC-24F-6") || !idInput ){
        document.querySelector("id-error").textContent = "Invalid ID"
return
}

if( sectionInput !="CS-IIB"   ){
        document.querySelector("section-error").textContent = "Invalid Section"
return
    }


    generatePDF();



        document.querySelector("section-error").value = ""
        document.querySelector("id-error").value = ""
        document.querySelector(".name-error").value=""


    nameInput=""
    idInput="CSC-24F-6"
    sectionInput="CS-IIB"


})



function generatePDF() 
{

       const { jsPDF } = window.jspdf;
       const doc = new jsPDF();

       // Add logo
       const img = new Image();
       img.src = "./logo.png";
       img.onload = function () {
         doc.addImage(img, "PNG", 10, 10, 30, 30);

         // Add university title
         doc.setFontSize(18);
         doc.text("Sindh Madressatul Islam University (SMIU)", 50, 25);

         // Add student details
         doc.setFontSize(12);
         doc.text(`Name: ${nameInput}`, 10, 50);
         doc.text(`ID: ${idInput}`, 10, 60);
         doc.text(`Section: ${sectionInput}`, 10, 70);

         // Add table of marks
         const headers = [
           [
             "Subjects",
             "Obtained Marks",
             "Total Marks",
             "Percentage",
             "Credit Hour",
             "Grade",
             "GP"
           ],
         ];
         const data = [
           [
             "Discrete Mathematics",
             marks[0],
             100,
             `${((marks[0]/100)*100).toFixed(2)}%`,
             3.00,
             calcGrade(marks[0],100).grade,
             ((calcGrade(marks[0],100).point)*3.00).toFixed(2),
           ],
           [
             "English-I",
             marks[1],
             100,
             `${((marks[1]/100)*100).toFixed(2)}%`,
             3.00,
             calcGrade(marks[1],100).grade,
            (( calcGrade(marks[1],100).point)*3.00).toFixed(2),
           ],
           [
             "ICT",
             marks[2],
             100,
             `${((marks[2]/100)*100).toFixed(2)}%`,
             3.00,
             calcGrade(marks[2],100).grade,
             ((calcGrade(marks[2],100).point)*3.00).toFixed(2),
           ],
           [
             "ICT LAB",
             marks[3],
             50,
             `${((marks[3]/50)*100).toFixed(2)}%`,
             1.00,
             calcGrade(marks[3],50).grade,
             ((calcGrade(marks[3],50).point)*1.00).toFixed(2),
           ],
           [
             "Programming Fundamentals",
             marks[4],
             100,
             `${((marks[4]/100)*100).toFixed(2)}%`,
             3.00,
             calcGrade(marks[4],100).grade,
             ((calcGrade(marks[4],100).point)*3.00).toFixed(2),
           ],
           [
             "PF Lab",
             marks[5],
             50,
             `${((marks[5]/50)*100).toFixed(2)}%`,
             1.00,
             calcGrade(marks[5],50).grade,
             ((calcGrade(marks[5],50).point)*1.00).toFixed(2),
           ],
           [
             "Calculus",
             marks[6],
             100,
             `${((marks[6]/100)*100).toFixed(2)}%`,
             3.00,
             calcGrade(marks[6],100).grade,
             ((calcGrade(marks[6],100).point)*3.00).toFixed(2),
           ],
           // Add other subjects similarly
           [
             "Total",
             marks.reduce((a,b)=>a+b),
             600,
             `${totalPercentage.toFixed(2)}`,
                16.00,
             Grade,
             totalGpa.toFixed(2),
           ],
         ];

         doc.autoTable({
           startY: 80,
           head: headers,
           body: data,
           theme: "grid",
         });

         // Save the PDF
         doc.save(`${nameInput}_Report.pdf`);
       };
}
