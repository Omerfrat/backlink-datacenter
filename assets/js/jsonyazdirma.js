document.addEventListener('DOMContentLoaded', function () {
    // Check for the presence of the element with ID 'toolsContent'
    const toolsContent = document.getElementById('toolsContent');
    if (toolsContent) {
        // Only run this code if the element is present
        const toolsUrl = '/json/tools.json'; // Update with your correct URL

        fetch(toolsUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                function generateCard(item) {
                    return `
                        <div class="card shadow p-3 mb-5 rounded" style="width: 18rem;">
                            <img src="${item.imageSrc}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${item.title}</h5>
                                <p class="card-text">${item.text}</p>
                                <a href="${item.link}" class="btn btn-download btn-style" download>Download</a>
                            </div>
                        </div>
                    `;
                }

                toolsContent.innerHTML = data.map(generateCard).join('');
            })
            .catch(error => {
                console.error('Error fetching tools data:', error);
                toolsContent.innerHTML = '<p>Error loading tools content.</p>';
            });
    }

    // Check for the presence of the element with ID 'urlCardsContainer'
    const urlCardsContainer = document.getElementById('urlCardsContainer');
    if (urlCardsContainer) {
        const telegramUrl = '/json/telegram.json'; // Update with your correct URL

        fetch(telegramUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                function createCard(url) {
                    return `
                        <div class="card card-width">
                            <div class="card-header">URL Link</div>
                            <div class="card-body">
                                <p>${url}</p>
                            </div>
                            <div class="card-footer card-footer-telegram">
                                <a href="${url}" target="_blank">Tıkla ve Kanala Git</a>
                            </div>
                        </div>
                    `;
                }

                urlCardsContainer.innerHTML = data.map(item => createCard(item.url)).join('');
            })
            .catch(error => {
                console.error('Error fetching URLs data:', error);
                urlCardsContainer.innerHTML = '<p>Error loading URL content.</p>';
            });
    }

    // Check for the presence of the element with ID 'domainTableBody'
    const tableBody = document.getElementById('domainTableBody');
    if (tableBody) {
        const domainUrl = '/json/veri.json'; // Update with your correct URL

        fetch(domainUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                data.forEach((item, index) => {
                    if (item && item.domain) {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${index + 1}</td>
                            <td>${item.domain}</td>
                        `;
                        tableBody.appendChild(row);
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching domain data:', error);
                const errorMessage = document.getElementById('error-message');
                if (errorMessage) {
                    errorMessage.textContent = 'Failed to load domain data. Please try again later.';
                    errorMessage.classList.remove('d-none');
                }
            });
    }
});

