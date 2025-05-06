const products = [
    {
      image: 'https://via.placeholder.com/100?text=Headphones',
      name: 'Wireless Headphones',
      price: '₹7,999',
      description: 'Noise-cancelling over-ear headphones.'
    },
    {
      image: 'https://via.placeholder.com/100?text=Smartwatch',
      name: 'Smartwatch',
      price: '₹12,999',
      description: 'Fitness tracking smartwatch.'
    },
    {
      image: 'https://via.placeholder.com/100?text=Mouse',
      name: 'Gaming Mouse',
      price: '₹2,499',
      description: 'Ergonomic gaming mouse.'
    },
    {
      image: 'https://via.placeholder.com/100?text=Stand',
      name: 'Laptop Stand',
      price: '₹1,999',
      description: 'Adjustable aluminium stand.'
    }
  ];
  
  let currentPage = 1;
  const productsPerPage = 2;
  const totalPages = Math.ceil(products.length / productsPerPage);
  
  function renderTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
  
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const pageProducts = products.slice(start, end);
  
    pageProducts.forEach(product => {
      const row = `
        <tr>
          <td><img src="${product.image}" alt="${product.name}"></td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.description}</td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  
    document.getElementById('pageInfo').innerText = `Page ${currentPage} of ${totalPages}`;
  }
  
  function nextPage() {
    if (currentPage < totalPages) {
      currentPage++;
      renderTable();
    }
  }
  
  function prevPage() {
    if (currentPage > 1) {
      currentPage--;
      renderTable();
    }
  }
  
  window.onload = renderTable;
  