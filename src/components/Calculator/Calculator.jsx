import React, { useState } from "react";
import arrow from "../../assets/images/icon-arrow.svg";

const Calculator = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [displayDay, setDisplayDay] = useState("- -");
  const [displayMonth, setDisplayMonth] = useState("- -");
  const [displayYear, setDisplayYear] = useState("- -");
  const [dayError, setDayError] = useState("");
  const [monthError, setMonthError] = useState("");
  const [yearError, setYearError] = useState("");

  const resetDisplay = () => {
    setDisplayDay("- -");
    setDisplayMonth("- -");
    setDisplayYear("- -");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isError = false;

    setDayError("");
    setMonthError("");
    setYearError("");

    //...

    // Check if day input field is filled and valid
    if (!day) {
      setDayError("This Field is required");
      isError = true;
    } else if (day < 1 || day > 31) {
      setDayError("Must be a valid day");
      isError = true;
    }

    if (!year) {
      setYearError("This Field is required");
      isError = true;
    } else if (year < 1925 || year > 2023) {
      setYearError("Must be a valid year");
      isError = true;
    }

    if (!month) {
      setMonthError("This field is required");
      isError = true;
    } else if (month < 1 || month > 12) {
      setMonthError("Must be a valid month");
      isError = true;
    }

    if (isError) {
      resetDisplay();
      return;
    }

    // Check if all input fields are filled
    if (day && month && year) {
      const birthDay = parseInt(day);
      const birthMonth = parseInt(month);
      const birthYear = parseInt(year);

      // Calculate age
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      const currentDay = currentDate.getDate();

      console.log(day);

      let years = currentYear - birthYear;
      let months = currentMonth - birthMonth;
      let days = currentDay - birthDay;

      if (
        currentMonth < birthMonth ||
        (currentMonth === birthMonth && currentDay < birthDay)
      ) {
        years--;
        months += 12;
      }

      if (days < 0) {
        months--;
        const daysInPreviousMonth = new Date(
          currentYear,
          currentMonth - 1,
          0
        ).getDate();
        days += daysInPreviousMonth;
      }

      // Update display variables
      setDisplayDay(days);
      setDisplayMonth(months);
      setDisplayYear(years);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 font-poppins">
      <div className="w-full rounded-[24px] rounded-br-[100px] bg-white px-6 pb-12 pt-12 max-w-[840px] md:p-[56px] md:rounded-br-[200px]">
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex gap-4 md:gap-8">
            <div className="relative flex w-full max-w-[160px] flex-col gap-1 md:gap-2">
              <label
                className={`text-xs font-bold uppercase tracking-[3px] text-customDarkGray md:text-[14px] md:tracking-[3.5px] md:leading-[normal] ${
                  dayError ? "text-red-500" : ""
                }`}
                htmlFor="day"
              >
                Day
              </label>

              <input
                type="number"
                id="day"
                name="day"
                min="1"
                max="31"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className={`h-[54px] w-full rounded-lg border pl-4 text-[20px] font-bold tracking-[0.2px] text-black hover:border-customPurple md:px-6 md:pt-3 md:pb-3 md:h-[72px] md:text-[32px] md:tracking-[0.32px] ${
                  dayError ? "border-red-500" : ""
                }`}
                placeholder="DD"
              ></input>
              {dayError && (
                <div className="absolute bottom-[-25px] hidden text-sm font-normal italic text-red-500 md:block">
                  {dayError}
                </div>
              )}
            </div>
            <div className="relative flex w-full max-w-[160px] flex-col gap-1 md:gap-2">
              <label
                className={`text-xs font-bold uppercase tracking-[3px] text-customDarkGray md:text-[14px] md:tracking-[3.5px] md:leading-[normal] ${
                  monthError ? "text-red-500" : ""
                }`}
                htmlFor="month"
              >
                Month
              </label>
              <input
                type="number"
                id="month"
                name="month"
                min="1"
                max="12"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className={`h-[54px] w-full rounded-lg border pl-4 text-[20px] font-bold tracking-[0.2px] text-black hover:border-customPurple md:pl-6 md:h-[72px] md:text-[32px] md:tracking-[0.32px] ${
                  monthError ? "border-red-500" : ""
                }`}
                placeholder="MM"
              />
              {dayError && (
                <div className="absolute bottom-[-25px] hidden text-sm font-normal italic text-red-500 md:block"> 
                  {monthError}
                </div>
              )}
            </div>
            <div className="relative flex w-full max-w-[160px] flex-col gap-1 md:gap-2">
              <label
                htmlFor="year"
                className={`text-xs font-bold uppercase tracking-[3px] text-customDarkGray md:text-[14px] md:tracking-[3.5px] md:leading-[normal] ${
                  yearError ? "text-red-500" : ""
                }`}
              >
                Year
              </label>
              <input
                type="number"
                id="year"
                name="year"
                min="1900"
                max={new Date().getFullYear()}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className={`h-[54px] w-full rounded-lg border pl-4 text-[20px] font-bold tracking-[0.2px] text-black hover:border-customPurple md:pl-6 md:h-[72px] md:text-[32px] md:tracking-[0.32px] ${
                  yearError ? "border-red-500" : ""
                }`}
                placeholder="YYYY"
              />
              {dayError && (
                <div className="absolute bottom-[-25px] hidden text-sm font-normal italic text-red-500 md:block">
                  {yearError}
                </div>
              )}
            </div>
          </div>

          <div className="relative mt-8 flex w-full flex-col items-center justify-center md:items-end md:mt-[0px]">
            <div className="absolute h-[1px] w-full bg-customGray"></div>
            <button
              className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-customPurple hover:bg-black md:w-[96px] md:h-[96px]"
              type="submit"
            >
              <img className="h-6 w-6" src={arrow} alt="Arrow Icon"></img>
            </button>
          </div>
        </form>

        <div className="mt-8 md:mt-[0px]">
          <div className="flex gap-2">
            <div className="text-[56px] font-extrabold italic leading-[110%] tracking-[-1.12px] text-customPurple md:text-[104px] md:tracking-[-2.08px]">
              {displayYear}
            </div>
            <div className="text-[56px] font-[800] italic leading-[110%] tracking-[-1.12px] text-black md:text-[104px] md:tracking-[-2.08px]">
              years
            </div>
          </div>
          <div className="flex gap-[9px]">
            <div className="text-[56px] font-extrabold italic leading-[110%] tracking-[-1.12px] text-customPurple md:text-[104px] md:tracking-[-2.08px]">
              {displayMonth}
            </div>
            <div className="text-[56px] font-[800] italic leading-[110%] tracking-[-1.12px] text-black md:text-[104px] md:tracking-[-2.08px]">
              months
            </div>
          </div>
          <div className="flex gap-2">
            <div className="text-[56px] font-extrabold italic leading-[110%] tracking-[-1.12px] text-customPurple md:text-[104px] md:tracking-[-2.08px]">
              {displayDay}
            </div>
            <div className="text-[56px] font-[800] italic leading-[110%] tracking-[-1.12px] text-black md:text-[104px] md:tracking-[-2.08px]">
              days
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Calculator;
