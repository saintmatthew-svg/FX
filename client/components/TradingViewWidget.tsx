import { useEffect, useRef, memo } from "react";

interface TradingViewWidgetProps {
  symbol?: string;
  theme?: "light" | "dark";
  width?: string | number;
  height?: string | number;
  interval?: string;
  range?: string;
  hide_side_toolbar?: boolean;
  allow_symbol_change?: boolean;
  save_image?: boolean;
  container_id?: string;
  style?:
    | "line"
    | "area"
    | "bars"
    | "candles"
    | "heikin_ashi"
    | "hollow_candles"
    | "baseline"
    | "renko"
    | "line_break"
    | "kagi"
    | "point_and_figure";
}

declare global {
  interface Window {
    TradingView: any;
  }
}

const TradingViewWidget = memo(
  ({
    symbol = "BINANCE:BTCUSDT",
    theme = "dark",
    width = "100%",
    height = 500,
    interval = "15",
    range = "1D",
    hide_side_toolbar = false,
    allow_symbol_change = true,
    save_image = false,
    container_id,
    style = "candles",
  }: TradingViewWidgetProps) => {
    const container = useRef<HTMLDivElement>(null);
    const scriptRef = useRef<HTMLScriptElement | null>(null);

    useEffect(() => {
      if (!container.current) return;

      // Generate unique container ID if not provided
      const containerId =
        container_id ||
        `tradingview_${Math.random().toString(36).substr(2, 9)}`;
      container.current.id = containerId;

      // Remove existing script if any
      if (scriptRef.current) {
        scriptRef.current.remove();
      }

      // Create and configure TradingView script
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: symbol,
        interval: interval,
        timezone: "Etc/UTC",
        theme: theme,
        style: style,
        locale: "en",
        enable_publishing: false,
        backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
        gridColor: theme === "dark" ? "#1a1a1a" : "#f0f0f0",
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: save_image,
        hide_side_toolbar: hide_side_toolbar,
        allow_symbol_change: allow_symbol_change,
        details: true,
        hotlist: true,
        calendar: false,
        studies: ["RSI@tv-basicstudies", "MACD@tv-basicstudies"],
        show_popup_button: true,
        popup_width: "1000",
        popup_height: "650",
        container_id: containerId,
        range: range,
        withdateranges: true,
        hide_volume: false,
        support_host: "https://www.tradingview.com",
      });

      container.current.appendChild(script);
      scriptRef.current = script;

      return () => {
        if (scriptRef.current) {
          scriptRef.current.remove();
        }
      };
    }, [
      symbol,
      theme,
      interval,
      range,
      hide_side_toolbar,
      allow_symbol_change,
      save_image,
      container_id,
      style,
    ]);

    return (
      <div
        ref={container}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
          backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
          borderRadius: "8px",
          overflow: "hidden",
        }}
        className="tradingview-widget-container"
      />
    );
  },
);

TradingViewWidget.displayName = "TradingViewWidget";

export default TradingViewWidget;
