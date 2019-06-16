<?php

    function getFilePaths(){
        //file paths
        $myArr = array("E:/SLIIT/2nd year/testfile.pdf", "E:/Apiit/file/cd/edit.pdf", "E:/SLIIT/file/cd/new/pro.pdf");

        //create json arry and passed
        echo json_encode($myArr);

    }

    if(isset($_GET['getFilePaths'])){
        getFilePaths();
    }

?>