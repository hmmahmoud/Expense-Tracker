const API_URL = "http://localhost:3000/expenses";

function fetchExpenses() {
    // alert("Error fetching expenses:", err);
    alert("Fetching expenses...");
    $.get(API_URL)
        .done((data) => {
            alert("Fetched expenses..");
            renderExpenses(data);
        })
        .fail((error) => {
            alert(`Error fetching expenses: ${data}`);
        });
    
    // $.ajax({
    //    url: API_URL,
    //    method: "GET",
    //    success: (data) => {
    //     alert(data);
    //     renderExpenses(data);
    //    } ,
    //    error: (err) => {
    //     // console.error("Error fetching expenses:", err);
    //     alert("Error fetching expenses:", err);

    //    },
    // });
}

// $("expense-form").submit(function(e) {
   $("#expense-form").on("submit", function (e) {
    e.preventDefault();
    const expense = {
        category: $("#category").val(),
        amount: parseFloat($("#amount").val()),
        description: $("#description").val(),
        date: $("#date").val(),
    };

    $.post(API_URL, expense)
    .done(() => {
        alert("Expense added successfully!");
        fetchExpenses();
        $("#expense-form")[0].reset();
    })
    .fail((error) => {
        alert(`Error adding expense: ${error}`);
    });
   });

//     $.ajax({
//         url: API_URL,
//         method: "POST",
//         contentType: "application/json",
//         data: JSON.stringify(expense),
//         success: () => {
//             fetchExpenses();
//             alert("Expense added successfully!");
//             $("#expense-form")[0].reset();
//         } ,
//         error: (err) => {
//             alert("Error adding expense:", err);
//             //  console.error("Error adding expense:", err);
//         },
//      });
// });

function deleteExpense(id) {
    $.ajax({
        url: `${API_URL}/${id}`,
        method: "DELETE",
        })
        // success: () => {
        .done(() => {
            alert("Expense deleted successfully!");
            fetchExpenses();
        })  
        .fail((error) => {
            alert(`Error deleting expense: ${error}`);
        });
        // error: (err) => {
        //  console.error("Error deleting expense:", err);
     
}

function renderExpenses(expenses) {
    alert("Rendering expenses...");
    
    const expenseRows = expenses
    
        .map((expense) => `
        <tr>
            <td>${expense.category}</td>
            <td>$${expense.amount}</td>
            <td>${expense.description || "N/A"}</td>
            <td>${new Date(expense.date).toLocaleDateString()}</td>
            <td>
                <button onclick="deleteExpense(${expense.id})">Delete</button>
            </td>
        </tr>
    `
        )
        .join("");
        $("#expenses").html(expenseRows);
}

fetchExpenses();

