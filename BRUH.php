<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
    <?php include 'translator.php' ?>

    <div id="languages">
        <div onclick="setLang('english')">English</div>
        <div onclick="setLang('polish')">German</div>
        <div onclick="setLang('german')">Polish</div>
    </div>

    <p><?php t("header"); ?></p>
    <div><?php t("description"); ?></div>

    <script>
        function setLang(lang) {
            window.location.href = "language_set.php?language=" + lang;
        }
    </script>
</body>
</html>