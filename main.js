const marksInput = Array.from( document.querySelectorAll(".marksInput"));
const calcBtn = document.querySelector(".calcBtn");
const form = document.querySelector(".form-marks");
const errorP = document.querySelector(".error")
const gpaRes = document.querySelector(".gpa-res")
const gradeRes = document.querySelector(".grade-res")
const percRes = document.querySelector(".perc-res")

let ds,fe,pf,pfLab,ict,ictLab,calc;
let totalGpa=0,totalPercentage=0,Grade="";
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
    if(!ds || !fe || !pf || !pfLab || !ict || !ictLab || !calc) {
        errorP.textContent = "One or more inputs are empty";
        return;
    }

    if(isNaN(ds) || isNaN(fe) || isNaN(pf) || isNaN(pfLab) || 
       isNaN(ict) || isNaN(ictLab) || isNaN(calc)) {
        errorP.textContent = "Invalid input detected";
        return;
    }

    // Calculate GPA
    let totalGp = (calcGrade(ds,100).point * 3.0) +
                  (calcGrade(fe,100).point * 3.0) +
                  (calcGrade(ict,100).point * 2.00) +
                  (calcGrade(ictLab,50).point * 1.00) +
                  (calcGrade(pf,100).point * 3.00) +
                  (calcGrade(pfLab,50).point * 2.00) +
                  (calcGrade(calc,100).point * 3.0);

    totalGpa = totalGp / 17.00;
    gpaRes.textContent = "GPA  : " + totalGpa.toFixed(2); // Show 2 decimal places

    totalPercentage=((ds+fe+pf+pfLab+ict+ictLab+calc)/600)*100
    percRes.textContent= "Percentage : "+totalPercentage.toFixed(2)+"%"

    Grade=calcGrade((ds+fe+pf+pfLab+ict+ictLab+calc),600).grade
    gradeRes.textContent= "Grade : "+Grade
    // Clear inputs
    marksInput.forEach((o) => o.value = "");
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
