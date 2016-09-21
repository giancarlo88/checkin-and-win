<?php

/**
 * Developer Database configuration
 */


/**
 * Database host
 */
DBConfig::setHost('localhost');


/**
 * Database name
 */
DBConfig::setName('tc_dubai_parks');


/**
 * Database username
 */
DBConfig::setUser('root');


/**
 * Database password
 */
DBConfig::setPassword('');


/**
 * Database table prefix
 */
DBConfig::setTablePrefix('dubai_parks_');


/**
 * Database tables
 */
DBConfig::setTables( array('user', 'invite') );
