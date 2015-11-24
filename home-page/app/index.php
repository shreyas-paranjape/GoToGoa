<!doctype html>
<html class="no-js">

<head>
    <meta charset="utf-8">
    <title>Goa Amigo</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <link rel="shortcut icon" href="/favicon.ico">
    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
    <!-- build:css(.) styles/vendor.css -->
    <!-- bower:css -->
    <!-- endbower -->
    <!-- endbuild -->
    <!-- build:css(.tmp) styles/main.css -->
    <link rel="stylesheet" href="styles/main.css">
    <link href='https://fonts.googleapis.com/css?family=Playfair+Display:400,700' rel='stylesheet' type='text/css'>
    <!-- endbuild -->
    <style>


    </style>

</head>

<body>
    <section class="jumbo-wrapper">
        <div class="jumbotron ">
            <h1>Thankyou for subscribing to us. We will notify you soon.</h1>
            <!--
            <div class="row">
                <div class="col-xs-6 col-lg-6 col-sm-6 col-md-6 block">
                    <div class="row">
                        <h1 style="">Goa Amigo</h1>
                        <h2 style="margin-top:30px;">Coming Soon</h2>
                    </div>
                    <div class="row" style="margin-top:50px;">
                        <form class="form-inline" role="form" method="post" action="index.php">
                            <div class="form-group">
                                <input type="email" class="form-control" id="email" placeholder="Your email id" style="margin-right: 15px;">
                            </div>
                            <button type="submit" class="btn btn-default">Notify me!!</button>
                        </form>
                        
                    </div>
                </div>
            </div>
-->

        </div>
        <?php
    if ($_POST["submit"]) {
        $email = $_POST['email'];
        $from = 'Goa Amigo'; 
        $tos = array ('ruchitaelekar05@gmail.com'); 
        $subject = 'Goa Amigo subscription';
        $body = "Hi\n Please notify me when the site is ready. You can contact me via my email id given below.\n E-Mail id: $email\n ";
        foreach ($tos as $to){
        	$headers =  "<" . $email .">" . "\r\n" .
           "Reply-To: " "<" . $email .">" . "\r\n" .
           "X-Mailer: PHP/" . phpversion();
            mail($to,$subject,$body,$headers,"-f".$email);
        }
        
// If there are no errors, send the email
//        echo "<p style=' '>"Thank you for contacting us.";
    }
?>
    </section>


    <!-- build:js(.) scripts/vendor.js -->
    <!-- bower:js -->
    <script src="bower_components/jquery/dist/jquery.js"></script>
    <!-- endbower -->
    <!-- endbuild -->

    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
    <!--<script>
      (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
      function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
      e=o.createElement(i);r=o.getElementsByTagName(i)[0];
      e.src='//www.google-analytics.com/analytics.js';
      r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
      ga('create','UA-XXXXX-X');ga('send','pageview');
    </script>-->

    <!-- build:js({app,.tmp}) scripts/main.js -->
    <script src="scripts/main.js"></script>
    <!-- endbuild -->
</body>

</html>
