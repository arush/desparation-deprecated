<?php

$installer = $this;

$installer->startSetup();

$message = Mage::getModel('adminnotification/inbox');
$message->setSeverity(Mage_AdminNotification_Model_Inbox::SEVERITY_NOTICE);
$message->setDateAdded(date("c", time()));
$message->setTitle("Sweet Tooth API 0.6 Was Installed Sucessfully");
$message->setDescription("Sweet Tooth Reward Points API Was Installed Sucessfully");
$message->setUrl("http://www.wdca.ca/sweet_tooth/wiki/index.php/API");
$message->save();

$installer->endSetup(); 


