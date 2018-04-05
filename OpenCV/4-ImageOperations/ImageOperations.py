import numpy as np 
import cv2 

img = cv2.imread("../Test.jpg", cv2.IMREAD_COLOR)

img[0:50, 0:50] =  img[100:150, 100:150]





cv2.imshow("img", img)

cv2.waitKey(0)
cv2.destroyAllWindows()