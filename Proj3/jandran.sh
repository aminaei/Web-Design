#!/bin/bash

perl -i -pe 's/\/home\/am\/Sites\/Proj3\/_uploadDIR_\//\/home\/jadrn030\/public_html\/proj3\/_uploadDIR_\//g' ./*.php
perl -i -pe 's/\/home\/am\/Sites\/Newproj3\/_uploadDIR_\//\/home\/jadrn030\/public_html\/proj3\/_uploadDIR_\//g' ./*.php
perl -i -pe 's/$dbuser = \x27al\x27/$dbuser = \x27jadrn030\x27/g' ./*.php
perl -i -pe 's/'localhost'/'opatija.sdsu.edu:3306'/g' ./*.php
