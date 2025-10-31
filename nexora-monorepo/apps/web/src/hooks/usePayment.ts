import { useState } from "react";
import { PromptData } from "../data/promptsData";

export interface OrderData {
  promptId: string;
  userEmail: string;
  includeVideo: boolean;
  totalAmount: number;
  currency: string;
  timestamp: Date;
}

export const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (
    prompt: PromptData,
    userEmail: string,
    includeVideo: boolean = false
  ): Promise<{ success: boolean; orderId?: string; error?: string }> => {
    setIsProcessing(true);
    setError(null);

    try {
      const totalAmount = includeVideo 
        ? prompt.price + (prompt.videoPrice || 0)
        : prompt.price;

      const orderData: OrderData = {
        promptId: prompt.id,
        userEmail,
        includeVideo,
        totalAmount,
        currency: "MXN",
        timestamp: new Date()
      };

      // Llamada a la API para crear la orden
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Error al crear la orden");
      }

      const result = await response.json();
      
      // Redirigir a Stripe/Lemon Squeezy checkout
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      }

      return { success: true, orderId: result.orderId };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsProcessing(false);
    }
  };

  const getOrderStatus = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`);
      if (!response.ok) {
        throw new Error("Error al obtener el estado de la orden");
      }
      return await response.json();
    } catch (err) {
      console.error("Error getting order status:", err);
      return null;
    }
  };

  return {
    createOrder,
    getOrderStatus,
    isProcessing,
    error,
  };
};
