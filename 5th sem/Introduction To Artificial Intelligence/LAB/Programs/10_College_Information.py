def college_bot():
    print("======================================")
    print(" Welcome to ABC College Chatbot")
    print(" Type 'exit' to quit")
    print("======================================")

    while True:
        user = input("\nAsk your question: ").lower()

        if user == "exit":
            print("Thank you for visiting ABC College!")
            break

        elif "college" in user or "about" in user:
            print("\nABC College is an autonomous institution established in 2001.")
            print("It offers UG and PG programs in Engineering, Science, and Management.")

        elif "admission" in user:
            print("\nAdmissions are based on entrance examination and merit.")
            print("Visit the admission office for complete details.")

        elif "course" in user:
            print("\nCourses Offered:")
            print("- B.E. Computer Science")
            print("- B.E. Electronics")
            print("- B.E. Mechanical")
            print("- MBA")
            print("- MCA")

        elif "department" in user:
            print("\nDepartments:")
            print("- Computer Science")
            print("- Information Technology")
            print("- Electronics and Communication")
            print("- Electrical Engineering")
            print("- Mechanical Engineering")
            print("- Civil Engineering")

        elif "fees" in user:
            print("\nFee details vary by course.")
            print("Contact Accounts Office for updated fee structure.")

        elif "placement" in user:
            print("\nPlacement Cell:")
            print("Highest Package: 12 LPA")
            print("Average Package: 4.5 LPA")
            print("Top Recruiters: TCS, Infosys, Wipro, Accenture")

        elif "hostel" in user:
            print("\nSeparate hostel facilities are available for boys and girls.")
            print("Wi-Fi, Mess, Security and Medical facilities are available.")

        elif "library" in user:
            print("\nLibrary contains over 50,000 books, journals, digital library and e-resources.")

        elif "transport" in user:
            print("\nCollege buses operate from major nearby cities and towns.")

        elif "faculty" in user:
            print("\nHighly qualified faculty members with Ph.D. and industry experience.")

        elif "contact" in user:
            print("\nPhone : +91-9876543210")
            print("Email : info@abccollege.edu")
            print("Website: www.abccollege.edu")

        elif "timing" in user:
            print("\nCollege Working Hours:")
            print("Monday - Friday : 9.00 AM to 4.30 PM")

        else:
            print("\nSorry! I don't have information about that.")
            print("Please ask about admissions, courses, departments, fees, placements, hostel, library, transport, faculty, timings or contact.")
college_bot()