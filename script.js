const targetUrl = 'https://api.apilayer.com/fixer/latest';
const apikey = 'niHtKLerRRr2eixHc0NG0WkB5lc3nqdA'

  // Function to fetch data from API and update the table
function updateTable() {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = '';

    const loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.style.display = 'block';

    const table = document.getElementById('currencyTable');
    table.style.display = 'none';

    fetch(targetUrl, {
        headers: {
        'apikey': apikey
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        
        if (data.rates != null) {
            // Add 10.0002 to each currency value
            const updatedData = {};
            for (const currency in data.rates) {
            updatedData[currency] = data.rates[currency] + 10.0002;
            }
            
            const table = document.getElementById('currencyTable');
            // Clear existing table content
            while (table.rows.length > 0) {
                table.deleteRow(0);
            }

            // Add table header row
            const headerRow = table.insertRow();
            const codeHeader = headerRow.insertCell();
            const originalHeader = headerRow.insertCell();
            const updatedHeader = headerRow.insertCell();

            codeHeader.textContent = 'Currency';
            originalHeader.textContent = 'Original Value';
            updatedHeader.textContent = 'Updated Value';


            // Populate the table with data
            for (const currency in data.rates) {
                const row = table.insertRow();
                const codeCell = row.insertCell();
                const originalCell = row.insertCell();
                const updatedCell = row.insertCell();

                codeCell.textContent = currency;
                originalCell.textContent = roundToFiveDecimalPlaces(data.rates[currency]);
                updatedCell.textContent = roundToFiveDecimalPlaces(updatedData[currency]);

                if (isEven(data.rates[currency]) || currency === 'HKD') {
                    originalCell.classList.add('red-border');
                    updatedCell.classList.add('red-border');
                }
            }
            table.style.display = 'table';
            loadingMessage.style.display = 'none';
        }
        else if (data.message != null) {
            console.log(data.message)
            throw new Error(data.message);
        }
        
    })
    .catch(error => {
        errorMessage.innerHTML = 'Error: Failed to fetch data from the API. <br> Message: ' + error.message;
        console.error(error);
    });
}
  
// Function to check if a number is even
function isEven(number) {
    return number % 2 === 0;
}

// Function to round off to 5 d.p.
function roundToFiveDecimalPlaces(number) {
    return Number(number.toFixed(5));
}
  
// Trigger API request and update the table on page load
window.onload = function() {
    updateTable();
};

// Add click event listener to the Refresh Table button
const refreshButton = document.getElementById('refreshButton');
refreshButton.addEventListener('click', updateTable);


// Function to check the number entered in the input box
function checkNumber() {
    const numberInput = document.getElementById('numberInput');
    const checkResult = document.getElementById('checkResult');
  
    const number = parseFloat(numberInput.value);
    if (isNaN(number)) {
      checkResult.textContent = 'Invalid number';
    } else {
        if (isEven(number)) {
            checkResult.textContent = "It is an even number";
        } else {
            checkResult.textContent = "It is not an even number";
        }
      
    }
  }

// Add click event listener to the Check button
const checkButton = document.getElementById('checkButton');
checkButton.addEventListener('click', checkNumber);