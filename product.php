<?php

$id=$_GET['id'];

$servername = "linode.ashrhmn.com";
$username = "bidbuy";
$password = "buybid";
$db = "bidbuy";
$conn = mysqli_connect($servername, $username, $password, $db);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
$sql="select * from products where id='$id'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$dt = new DateTime($row['created_at']);
$date= $dt->format('d-M-Y');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Font Awesome -->
<link
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
  rel="stylesheet"
/>
<!-- Google Fonts -->
<link
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
  rel="stylesheet"
/>
<!-- MDB -->
<link
  href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/4.4.0/mdb.min.css"
  rel="stylesheet"
/>
    <title>BidBuy</title>
</head>
<body style="background-color: rgb(55 65 81);">
<section style="background-color: rgb(55 65 81)">
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-4">
        <div class="card text-black">
          
          <img src=<?php echo $row["image"]?>
            class="card-img-top" alt="Apple Computer" />
          <div class="card-body ">
            <div class="text-center">
              <h5 class="card-title"><?php echo $row["name"]?></h5>
              <p class="text-muted mb-4"><?php echo $row["description"]?></p>
            </div>
            <div>
              <div class="d-flex justify-content-between">
                <span>Catagory: </span><span><?php echo $row["category"]?></span>
              </div>
            <div>
              <div class="d-flex justify-content-between">
                <span>Price: </span><span>$<?php echo $row["price"]?></span>
              </div>
              
              <div class="d-flex justify-content-between">
                <span>Listed Date: </span><span><?php echo $date?></span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    
</body>
</html>