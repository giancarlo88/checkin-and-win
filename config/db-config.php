<?php

/**
 * Database configuration
 */


/**
 * Database host
 */
DBConfig::setHost('localhost');


/**
 * Database name
 */
DBConfig::setName('outfit');


/**
 * Database username
 */
DBConfig::setUser('production');


/**
 * Database password
 */
DBConfig::setPassword('4Fb8JUrswjZ2');


/**
 * Database table prefix
 */
DBConfig::setTablePrefix('checkin_and_win_');


/**
 * Database tables
 */
DBConfig::setTables( array('user', 'invite') );
