#!/usr/bin/python3
"""Fill the hbnb db with dummy data"""
import os
import subprocess
import random

def create(string):
    y = subprocess.check_output(['./simpleconsole', string]) #'./simpleconsole \'create User email="f" password="r"\'')
    return y.decode('utf-8')[0:-1]

first_names = ['Bob', 'George', 'Susan', 'Alex']
last_names = ['Jones', 'Shaw', 'Miscovics', 'Doe']
emails = ['s.com', 'a.net', 'q.gov']
passwords = ['x', 'y', 'password123', 'baseball']
user_ids = []

amens = ['wifi', 'anti-wifi', 'double-wifi', 'peticide', 'pesticide']
amen_ids = []

places = ['room', 'other room', 'suite', 'all of hawaii']
place_descriptions = ['a room', 'something something, something.', 'placeplaceplace, window, door, wifi, etc.']
place_room_no = [3, 5, 1, 0]
place_bath_no = [4, 5, 12, 9]
place_guest = [1, 0, 2, 3, 4]
place_price = [34, 234, 2345, 23, 2, 90]
latitudes = [1, 23423, 12343, 1234]
longitudes = [4567, 2341, 3234, 902]
place_ids = []

cities = ['Boston', 'Rhode Island', 'NYC', 'Bozeman']
city_ids = []

states = ['Montana', 'Canada', 'South Dakota', 'North Dakota', 'Wyoming', 'Oregon', 'Idaho']
state_ids = []

review_text = ['Weve all been there. Youve read a great book, you want to leave a review and support the author… but what to say? Thats where the random reviews generator comes in. Below you will find a randomly generated review that any author would be delighted to receive! Simply copy and paste it and voila! Dont think the review is quite right? Refresh the page and another will appear.', 'This book was an absolute pleasure to read. It was just one of those stories thats pretty relatable.', 'This was a lovely romance. The main protagonists and secondary characters are complex and fun and the story was really touching. I cant wait to read more from this author.']

def createUser(email, password, first_name, last_name):
    string = 'create User email="'+email+'" password="'+password+'" first_name="'+first_name+'" last_name="'+last_name+'"'
    return create(string)
def createAmenity(name):
    string = 'create Amenity name="'+name+'"'
    return create(string)
def createPlace(city_id, user_id, name, desc, number_rooms, number_bathrooms, max_guest, price_by_night, latitude, longitude):
    string = 'create Place city_id="'+city_id+'" user_id="'+user_id+'" name="'+name+'" description="'+desc+'" number_rooms='+str(number_rooms)+' number_bathrooms='+str(number_bathrooms)+' max_guest='+str(max_guest)+' price_by_night='+str(price_by_night)+' latitude='+str(latitude)+' longitude='+str(longitude)+''
    return create(string)
def createCity(state_id, name):
    string = 'create City state_id="'+state_id+'" name="'+name+'"'
    return create(string)
def createState(name):
    string = 'create State name="'+name+'"'
    return create(string)
def createReview(text, place_id, user_id):
    string = 'create Review text="'+text+'" place_id="'+place_id+'" user_id="'+user_id+'"'
    return create(string)

def r(x):
    return random.choice(x)

print("Amenities")
for x in range(0, 6):
    a = createAmenity(r(amens))
    print(a)
    amen_ids.append(a)

print("States")
for x in range(0, 4):
    s = createState(r(states))
    print(s)
    state_ids.append(s)

print("Cites")
for x in range(0, 5):
    c = createCity(r(state_ids), r(cities))
    print(c)
    city_ids.append(c)

print("Users")
for x in range(0, 3):
    u = createUser(r(emails), r(passwords), r(first_names), r(last_names))
    print(u)
    user_ids.append(u)

print("Places")
for x in range(0, 14):
    p = createPlace(r(city_ids), r(user_ids), r(places), r(place_descriptions), r(place_room_no), r(place_bath_no), r(place_guest), r(place_price), r(latitudes), r(longitudes))
    print(p)
    place_ids.append(p)

print("Reviews")
for x in range(0, 20):
    r2 = createReview(r(review_text), r(place_ids), r(user_ids))
    print(r2)
