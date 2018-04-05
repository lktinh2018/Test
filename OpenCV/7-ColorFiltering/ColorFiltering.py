import numpy as np 
import cv2 

cap = cv2.VideoCapture(0) 

while True: 
    _, frame = cap.read()
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    lower_black = np.array([240,240,240])
    upper_black = np.array([255,255,255])


    mask = cv2.inRange(hsv, lower_black, upper_black)
    res = cv2.bitwise_and(frame, frame, mask=mask)

    cv2.imshow('frame', frame)
    cv2.imshow('mask', mask)

    cv2.imshow('res', res)


    k = cv2.waitKey(5) & 0xFF
    if k == 27:
        break

cv2.destroyAllWindows()
cap.release()