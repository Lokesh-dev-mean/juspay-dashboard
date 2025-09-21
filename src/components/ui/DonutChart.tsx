import React, { useRef, useEffect } from "react";
import { Box } from "@mui/material";

export interface DonutChartData {
  name: string;
  value: number;
  color: string;
}

export interface DonutChartProps {
  data: DonutChartData[];
  size?: number;
  strokeWidth?: number;
  gapDegrees?: number;
  gapPx?: number; // gap between segments in pixels along the arc
  trackColor?: string;
  innerStrokeColor?: string;
  innerStrokeWidth?: number;
  className?: string;
  debug?: boolean; // enable/disable debug lines
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = 120,
  strokeWidth = 18,
  gapDegrees = 6,
  gapPx,
  trackColor = "#f1f1f1",
  innerStrokeColor = "#ffffff",
  innerStrokeWidth = 2,
  className,
  debug = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size, size);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const gapRadBase = gapPx != null ? gapPx / radius : (gapDegrees * Math.PI) / 180;

    // Draw background track
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = trackColor;
    ctx.lineCap = "butt";
    ctx.stroke();

    let currentAngle = -Math.PI / 2;

    data.forEach((item, index) => {
      const segmentAngle = (item.value / totalValue) * Math.PI * 2;
      const safeGap = Math.min(gapRadBase, segmentAngle * 0.45);

      const startAngle = currentAngle + safeGap / 2;
      const endAngle = currentAngle + segmentAngle - safeGap / 2;

      if (endAngle - startAngle > 0.001) {
        // White outline under-stroke
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.lineWidth = strokeWidth + 2;
        ctx.lineCap =   "round";
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();
        ctx.closePath();

        // Colored line on top
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.lineWidth = strokeWidth;
        ctx.lineCap = "round";
        ctx.strokeStyle = item.color;
        ctx.stroke();
        ctx.closePath();
      }

      // ✅ DEBUG LINES
      if (debug) {
        const midAngle = (startAngle + endAngle) / 2;

        // Start angle line (red)
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + radius * Math.cos(startAngle),
          centerY + radius * Math.sin(startAngle)
        );
        ctx.strokeStyle = "red";
        ctx.stroke();

        // End angle line (blue)
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + radius * Math.cos(endAngle),
          centerY + radius * Math.sin(endAngle)
        );
        ctx.strokeStyle = "blue";
        ctx.stroke();

        // Label
        ctx.fillStyle = "black";
        ctx.font = "10px Arial";
        ctx.fillText(
          `${index}: ${item.value}`,
          centerX + (radius + 12) * Math.cos(midAngle),
          centerY + (radius + 12) * Math.sin(midAngle)
        );
      }

      currentAngle += segmentAngle;
    });

    // 🔄 EXTRA ARC with first segment’s color
    if (data.length > 0) {
      const firstColor = data[0].color;
      const extraStart = currentAngle - 0.02; // just before the circle ends
      const extraEnd = currentAngle; // closing arc

      // White separator stroke
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, extraStart, extraEnd);
      ctx.lineWidth = strokeWidth + 2;
      ctx.strokeStyle = "#ffffff";
      ctx.lineCap = "round";
      ctx.stroke();

      // Colored arc
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, extraStart, extraEnd);
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = firstColor;
      ctx.lineCap = "round";
      ctx.stroke();
    }

    // Inner white border stroke (optional)
    if (innerStrokeWidth > 0) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - strokeWidth / 2, 0, Math.PI * 2);
      ctx.lineWidth = innerStrokeWidth;
      ctx.strokeStyle = innerStrokeColor;
      ctx.stroke();
    }
  }, [
    data,
    size,
    strokeWidth,
    gapDegrees,
    gapPx,
    trackColor,
    innerStrokeColor,
    innerStrokeWidth,
    totalValue,
    debug,
  ]);

  return (
    <Box
      className={className}
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ position: "relative", display: "inline-block" }}>
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            borderRadius: "50%",
          }}
        />
      </Box>
    </Box>
  );
};