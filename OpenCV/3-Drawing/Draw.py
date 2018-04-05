import numpy as np
import cv2

img = cv2.imread('../Test.jpg', cv2.IMREAD_COLOR)


cv2.line(img, (0,0), (100,200), (255,255,255), 15)
cv2.rectangle(img, (15,5), (200,150), (0,255,0), 5)
cv2.circle(img, (100,63), 55, (0,0,255), -1)

pts = np.array([[10,10], [50,10], [50,50],[10,100]], np.int32)

cv2.polylines(img, [pts], True, (0,255,255), 5)


font = cv2.FONT_HERSHEY_SIMPLEX

cv2.putText(img, "Hello World !", (0,130), font, 1, (0,2550,0), 2, cv2.LINE_AA)

cv2.imshow('image', img)
cv2.waitKey(0)
cv2.destroyAllWindows()