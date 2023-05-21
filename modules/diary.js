const glassCountForm = document.querySelector(".diary-water-tracker__form");
const trackerInput = document.querySelector(".diary-water-tracker__form");
const glassCountRes = document.querySelector(".diary-water-tracker__crrnt-res");


const handleFormChange = (e) => {
    const glassCount = e.target.value;
    console.log(glassCount)
    glassCountRes.textContent = `${glassCount*200}`;
    return e.target.value
}

glassCountForm.addEventListener("change", handleFormChange)

