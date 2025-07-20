"use client";

import { useState, useEffect } from "react";
import { IoCalendarSharp } from "react-icons/io5";

export default function Countdown() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [targetDate, setTargetDate] = useState(new Date("2025-08-29T00:00:00"));
  const [dateInput, setDateInput] = useState("29/08/2025, 12:00 AM");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTime({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const colonVisible = Math.floor(Date.now() / 500) % 2 === 0;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateInput(e.target.value);
  };

  const handleDateSubmit = () => {
    // Parse the date from the input string (format: DD/MM/YYYY, HH:MM AM/PM)
    const [datePart, timePart] = dateInput.split(", ");
    const [day, month, year] = datePart.split("/").map(Number);
    const [time, period] = timePart.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    
    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    
    const newDate = new Date(year, month - 1, day, hours, minutes);
    if (!isNaN(newDate.getTime())) {
      setTargetDate(newDate);
      setShowDatePicker(false);
    }
  };

  const formatDisplayDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";

    return `${day}/${month}/${year}, ${hours}:${minutes} ${ampm}`;
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Blur overlay when modal is open */}
      {showDatePicker && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 10,
          }}
        />
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <main
            style={{
              fontFamily: '"Digital-7", monospace',
              fontSize: "5rem",
              color: "#00FF41",
              lineHeight: "1",
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span>{time.days.toString().padStart(2, "0")}</span>
              <span style={{ fontSize: "1rem" }}>DAYS</span>
            </div>
            <span
              style={{
                alignSelf: "center",
                opacity: colonVisible ? 1 : 0.3,
                marginBottom: "1.5rem",
              }}
            >
              :
            </span>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span>{time.hours.toString().padStart(2, "0")}</span>
              <span style={{ fontSize: "1rem" }}>HOURS</span>
            </div>
            <span
              style={{
                alignSelf: "center",
                opacity: colonVisible ? 1 : 0.3,
                marginBottom: "1.5rem",
              }}
            >
              :
            </span>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span>{time.minutes.toString().padStart(2, "0")}</span>
              <span style={{ fontSize: "1rem" }}>MINUTES</span>
            </div>
            <span
              style={{
                alignSelf: "center",
                opacity: colonVisible ? 1 : 0.3,
                marginBottom: "1.5rem",
              }}
            >
              :
            </span>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span>{time.seconds.toString().padStart(2, "0")}</span>
              <span style={{ fontSize: "1rem" }}>SECONDS</span>
            </div>
          </main>

          <button
            onClick={() => {
              setDateInput(formatDisplayDate(targetDate));
              setShowDatePicker(true);
            }}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#00FF41",
              fontSize: "2rem",
              marginLeft: "1rem",
            }}
            aria-label="Change target date"
          >
            <IoCalendarSharp />
          </button>
        </div>

        {/* Modal Popup */}
        {showDatePicker && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(5px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: "rgba(0, 20, 0, 0.9)",
                border: "2px solid #00FF41",
                borderRadius: "8px",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                boxShadow: "0 0 20px #00FF41",
                minWidth: "300px",
                zIndex: 1001,
              }}
            >
              <h3
                style={{
                  color: "#00FF41",
                  fontSize: "1.5rem",
                  marginBottom: "1rem",
                  fontFamily: "monospace",
                }}
              >
                Set Target Date
              </h3>

              <input
                type="text"
                value={dateInput}
                onChange={handleDateChange}
                placeholder="DD/MM/YYYY, HH:MM AM/PM"
                style={{
                  padding: "0.8rem",
                  background: "rgba(0, 0, 0, 0.7)",
                  color: "#00FF41",
                  border: "1px solid #00FF41",
                  borderRadius: "4px",
                  fontFamily: "monospace",
                  fontSize: "1rem",
                  marginBottom: "1rem",
                  width: "100%",
                }}
              />

              <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
                <button
                  onClick={handleDateSubmit}
                  style={{
                    padding: "0.5rem 1rem",
                    background: "rgba(0, 0, 0, 0.7)",
                    color: "#00FF41",
                    border: "1px solid #00FF41",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontFamily: "monospace",
                    fontSize: "1rem",
                    flex: 1,
                  }}
                >
                  Set Date
                </button>
                <button
                  onClick={() => setShowDatePicker(false)}
                  style={{
                    padding: "0.5rem 1rem",
                    background: "rgba(0, 0, 0, 0.7)",
                    color: "#FF0000",
                    border: "1px solid #FF0000",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontFamily: "monospace",
                    fontSize: "1rem",
                    flex: 1,
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}