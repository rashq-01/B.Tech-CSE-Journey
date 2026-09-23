'''

A function is a organized block of code  designed to


Advantages of Functions

1. Acts as a building blocks for the program.
2. Reuse of code ie. enhance software reusability.
3. Function supports the divide and conquer strategy.

Types of function
1. Built in function --> The standard functions that are provided by python.
2. User-Defined Functions--> The programmer can define its own functions.


def functionName(paramList):
    function_suite(Code);
    return [Expression, value, variable]

1. Function name (function name) is a valid identifier.
    a. Valid Function names: IntegerSum

'''


'''
def prime(n):
    for x in range(2,n):
        if n%x==0:
            print("It's not a prime number")
            return
    print("It is a prime number")


prime(10)'''

#Write a program to print squares of upto number 10 using function

# def square(x):
#     return x*x

# for i in range(1,11):
#     print(square(i))


# Writ a program using function that return a+b
# def sum(x,y):
#     return x+y

# a = [1,2,3,4,5,6,7]
# for i in range(0,len(a)-1):
#     print(a[i],"+",a[i+1]," = " ,sum(a[i],a[i+1]))


#write a function that return values like sum multiplication and division etc

# def multi(x,y):
#     a = x+y
#     s = x-y
#     ml = x*y
#     m = x%y if y!=0 else "undefined"
#     nd = x/y if y!=0 else "infinity"
#     fd = x//y if y!=0 else "infinity"
#     return a,s,ml,m,nd,fd

# a,s,ml,m,nd,fd = multi(10,4)

# print("Addition = ",a)
# print("Subtraction = ",s)
# print("Multiplication = ",ml)
# print("Modulus = ",m)
# print("Normal Division = ",nd)
# print("Floor Division = ",fd)



# Write a program to print factorial of a given number using function
# def factorial(x):
#     fact = 1
#     for i in range(1,x+1):
#         fact*=i
#     return fact

# def factorial(x):
#     if(x<=0 or x==1):
#         return x
#     return x * factorial(x-1)

# def factorial(n:int)->int:
#     if n<0:
#         raise ValueError("Factorial is not define less than or equal zero")
#     fact = 1
#     for i in range(2,n+1):
#         fact*=i
#     return fact

# a=int(input("Enter a number : "))
# print("Factorial of",a,"is",factorial(a))
# print("Factorial of",a,"is",factorial(0))
# print("Factorial of",a,"is",factorial(10))




#Write a program to print the sum of n natural numbers
def sumNatural(n:int)->int:
    if n<0:
        raise ValueError("Factorial is not define less than or equal zero")
    sum = 0
    for i in range(0,n+1):
        sum+=i
    return sum

n=int(input("Enter a number : "))
print("Sum of ",n,"natural number is",sumNatural(n))
