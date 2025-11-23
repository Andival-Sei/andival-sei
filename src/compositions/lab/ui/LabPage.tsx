"use client";

import { Footer } from "@/src/widgets/footer";
import { Header } from "@/src/widgets/header";

export function LabPage() {
  return (
    <>
      <Header />
      <main className="lab-page">
        <div className="lab-content">
          <div className="lab-icon">
            <svg
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="lab-title">Страница в разработке</h1>
          <p className="lab-description">
            Лаборатория находится в процессе создания. Скоро здесь появится
            что-то интересное!
          </p>
          <div className="lab-loader">
            <div className="loader-dot"></div>
            <div className="loader-dot"></div>
            <div className="loader-dot"></div>
          </div>
        </div>

        <style jsx>{`
          .lab-page {
            min-height: calc(100vh - 200px);
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(
              135deg,
              hsl(var(--muted) / 0.3) 0%,
              hsl(var(--background)) 100%
            );
            padding: 4rem 2rem;
          }

          .lab-content {
            text-align: center;
            max-width: 600px;
            animation: fadeInUp 0.6s ease-out;
          }

          .lab-icon {
            color: hsl(var(--primary));
            margin: 0 auto 2rem;
            opacity: 0.8;
            animation: float 3s ease-in-out infinite;
          }

          .lab-title {
            font-size: clamp(2rem, 5vw, 3.5rem);
            font-weight: 700;
            margin-bottom: 1rem;
            background: linear-gradient(
              135deg,
              hsl(var(--primary)),
              hsl(var(--primary) / 0.6)
            );
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .lab-description {
            font-size: 1.125rem;
            color: hsl(var(--muted-foreground));
            margin-bottom: 2.5rem;
            line-height: 1.6;
          }

          .lab-loader {
            display: flex;
            gap: 0.75rem;
            justify-content: center;
            align-items: center;
          }

          .loader-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: hsl(var(--primary));
            animation: bounce 1.4s ease-in-out infinite;
          }

          .loader-dot:nth-child(1) {
            animation-delay: -0.32s;
          }

          .loader-dot:nth-child(2) {
            animation-delay: -0.16s;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          @keyframes bounce {
            0%,
            80%,
            100% {
              transform: scale(0);
              opacity: 0.5;
            }
            40% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
}
