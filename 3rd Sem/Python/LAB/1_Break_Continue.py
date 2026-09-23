#Find the first even number in a list
a = [1,2,3,4,5,6,7,8,9,0,234,46,77,66,32,12,563,55,66,77,88]
for i in range(0,len(a)):
    if(a[i]%2==0):
        print(a[i],end=" ")
        break