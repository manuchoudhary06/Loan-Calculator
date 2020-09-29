// Listen for submit 
document.getElementById('loan-form').addEventListener('submit',function(e){

  //hide results
  document.getElementById('results').style.display = 'none';

  //show loaders
  document.getElementById('loading').style.display = 'block';
  setTimeout(claculateResults,2000)

  e.preventDefault();
})


//Calcualate Function
function claculateResults(){
  //UI VARs
  const UIamount = document.getElementById('amount');
  const UIinterest = document.getElementById('interest');
  const UIyears = document.getElementById('years');

  const monthlyPayment = document.getElementById('monthly-payment')
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest')

  const principal = parseFloat(UIamount.value)
  const calculatedInterest = parseFloat(UIinterest.value) /100 / 12
  const calculatedPayment = parseFloat(UIyears.value)*12;

  //Compute the monthly Payments 

  const x = Math.pow(1+calculatedInterest,calculatedPayment);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly*calculatedPayment).toFixed(2)
    totalInterest.value = ((monthly*calculatedPayment)-principal).toFixed(2)

    //show results
    document.getElementById('results').style.display = 'block';
    //hide loaders
    document.getElementById('loading').style.display = 'none';
  }
  else{
    showError("Please Check You Numbers")
  }

 
}

//show error
function showError(error){

   //hide results
   document.getElementById('results').style.display = 'none';
   //hide loaders
   document.getElementById('loading').style.display = 'none';

  //create a div
  const errorDiv = document.createElement("div");

  //Get Elements
  const card = document.querySelector('.card')
  const heading = document.querySelector('.heading')


  //Add class 
  errorDiv.className = 'alert alert-danger'

  //Create text node and append to errorDiv
  errorDiv.appendChild(document.createTextNode(error));

  //Insert Erro Above Heading
  card.insertBefore(errorDiv,heading)

  //Clear error after 3 sec

  setTimeout(clearError,3000)

}

function clearError(){
  document.querySelector('.alert').remove();
}