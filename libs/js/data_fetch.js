document.addEventListener('DOMContentLoaded', () => {
  const saveButton = document.getElementById('saveDistanceButton');
  const savedDistancesForm = document.getElementById('savedDistancesForm');
  const messageSave = document.getElementById('messageSave');
  const savedChoicesDropdown = document.getElementById('savedChoices');

  // --- 1. FETCH AND POPULATE DROPDOWN ---
  async function loadSavedDistances() {
    if (!window.electronAPI) {
      console.error("preload.js is not connected! window.electronAPI is missing on startup.");
      return;
    }
    const distances = await window.electronAPI.getSavedDistances();
    populateDropdown(distances);
  }

  function populateDropdown(distances) {
    if(!savedChoicesDropdown) return;
    savedChoicesDropdown.innerHTML = '<option value="None" disabled selected>Select a value</option>';
    distances.forEach((item, index) => {
      const option = document.createElement('option');
      option.id = `saved_opt_${index}`;
      option.value = item.value;
      option.textContent = `${item.value} - ${item.imageSize}`;
      savedChoicesDropdown.appendChild(option);
    });
  }

  loadSavedDistances();

  // --- 2. VALIDATE AND SAVE NEW DATA ---
  if (saveButton) {
    console.log("Save button successfully found and wired up!"); // Debug log

    saveButton.addEventListener('click', async () => {
      console.log("Save button was clicked!"); // Debug log

      const distanceValue = document.getElementById('saveDistance').value.trim();
      const imgSizeValue = document.getElementById('imgSizeInfo').value.trim();

      const distanceNum = parseFloat(distanceValue);
      if (isNaN(distanceNum) || distanceNum <= 0) {
        alert("Validation Failed: Please enter a valid number greater than 0.");
        return; 
      }

      const sizeRegex = /^[1-9]\d*x[1-9]\d*$/i; 
      if (!sizeRegex.test(imgSizeValue)) {
        alert("Validation Failed: Please enter a valid image resolution format (e.g., 1920x1080).");
        return; 
      }

      // THE SILENT KILLER CHECK
      if (!window.electronAPI) {
        alert("CRITICAL ERROR: window.electronAPI is undefined! Your preload.js is not working or the path in main.js is wrong.");
        return;
      }

      try {
        console.log("Sending data to main process..."); // Debug log

        const result = await window.electronAPI.saveDistance({
          value: distanceNum, 
          imageSize: imgSizeValue.toLowerCase() 
        });

        if (result.success) {
          console.log("Data saved successfully!"); // Debug log
          populateDropdown(result.data);
          messageSave.innerHTML = '<b><span style="color: #28a745;">&#10004; Value saved successfully!</span></b>';
          savedDistancesForm.reset();
          setTimeout(() => messageSave.innerHTML = '', 4000);
        } else {
          console.error("Backend error:", result.error); // Debug log
          messageSave.innerHTML = '<b><span style="color: #dc3545;">&#10006; Failed to save value.</span></b>';
          alert("Backend Error: " + result.error);
        }
      } catch (err) {
        alert("IPC Communication Error: " + err.message);
      }
    });
  } else {
    console.error("Save button NOT found in the DOM!");
  }
});