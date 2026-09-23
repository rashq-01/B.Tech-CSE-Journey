def countSubstr(s1,s2):
    if len(s2) < len(s1):
        return 0;

    count = 1 if s1==s2[:len(s1)] else 0

    return count + countSubstr(s1,s2[1:])

s1 = input("Enter the s1 : ")
s2 = input("Enter s2 : ")
print(countSubstr(s1,s2))