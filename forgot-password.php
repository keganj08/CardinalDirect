<!--DELETED HEADER.PHP-->

<!DOCTYPE html>
<html lang="en" >
<head>
  <!--set browser icon-->
  <link rel="icon" href="assets/images/browserIcon.jpg">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CD/Forgot-Password</title>
  <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css'>
<link rel="stylesheet" href="assets/css/login_style.css">

</head>
<body>
<div class="pt-5">
  <!--logo-->
  <div class="inside">
    <div class="logo"> 
        <img src="assets/images/cardinaldirect_logo.jpg" >

    </div> 
</div> 
  <!--page header -->
  <h1 class="text-center">Forgot Password? <br>No worries.</br></h1>
  <!--white box-->
<div class="container">
      <div class="row">
          <div class="col-md-5 mx-auto">
              <div class="card card-body">
                  <!--white box--> 
                  <!--<form id="submitForm" action="plink-sent.html" method="post" required>-->
                 <form id="submitForm" action="php/forgottenpwd/includes/reset-request.inc.php" method="post">  
                    <div class="form-group required">
                      <label for="email">Email</label>
                      <input type="email" name="email" class="form-control text-lowercase" id="email" required >
                      
                    </div>  
              
                      <!--reset button-->
                    
                      <div class="form-group pt-1">
                        <button class="btn btn-primary btn-block" name="reset-request-submit" type="submit"> Reset Password</button>

                    </div>
                </form>

                <?php
                    if (isset($_GET["reset"])){
                        if ($_GET["reset"] == "success"){
                            echo '<p class="signupsuccess">Check your e-mail!</p>';
                        }
                    }
              ?>
      
              </div>
              
          </div>
      </div>
  </div>
</div>
</body>

</div>
 
</html>

<!--DELETED FOOTER.PHP>
