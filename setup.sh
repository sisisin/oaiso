#!/bin/bash

psql -c 'create database onokori_test' postgres
psql -c 'create database onokori' postgres
psql -c 'create user local' onokori_test
