"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { ZoomIn, ZoomOut, RotateCcw, Check, X, ShieldAlert, Sparkles } from "lucide-react";

interface ImageCropperModalProps {
  isOpen: boolean;
  imageSrc: string;
  originalFileName?: string;
  onClose: () => void;
  onApplyCrop: (croppedFile: File, previewUrl: string) => void;
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number): Crop {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 85,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export function ImageCropperModal({
  isOpen,
  imageSrc,
  originalFileName = "scholar-portrait.jpg",
  onClose,
  onApplyCrop,
}: ImageCropperModalProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [previewCanvasUrl, setPreviewCanvasUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize crop when image loads
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const initialCrop = centerAspectCrop(width, height, 1);
    setCrop(initialCrop);
  }

  // Update live preview thumbnail whenever crop or scale changes
  useEffect(() => {
    if (
      !completedCrop ||
      !previewCanvasRef.current ||
      !imgRef.current ||
      completedCrop.width === 0 ||
      completedCrop.height === 0
    ) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Use high-definition 512x512 canvas for preview and final export
    canvas.width = 512;
    canvas.height = 512;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.save();
    // Clear previous
    ctx.clearRect(0, 0, 512, 512);

    // Source coordinates calculated from natural dimensions
    const sx = completedCrop.x * scaleX;
    const sy = completedCrop.y * scaleY;
    const sWidth = completedCrop.width * scaleX;
    const sHeight = completedCrop.height * scaleY;

    ctx.drawImage(
      image,
      sx,
      sy,
      sWidth,
      sHeight,
      0,
      0,
      512,
      512
    );

    ctx.restore();

    try {
      const url = canvas.toDataURL("image/jpeg", 0.92);
      setPreviewCanvasUrl(url);
    } catch {
      // Ignore if canvas tainted
    }
  }, [completedCrop, scale]);

  const handleApply = useCallback(async () => {
    if (!completedCrop || !imgRef.current) {
      setError("Please adjust the frame before applying.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const image = imgRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Unable to create 2D canvas context");
      }

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const sx = completedCrop.x * scaleX;
      const sy = completedCrop.y * scaleY;
      const sWidth = completedCrop.width * scaleX;
      const sHeight = completedCrop.height * scaleY;

      ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, 512, 512);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError("Could not process cropped image.");
            setIsProcessing(false);
            return;
          }

          // Generate clean standardized file
          const cleanBaseName = originalFileName.replace(/\.[^/.]+$/, "");
          const file = new File([blob], `${cleanBaseName}-512x512.jpg`, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });

          const previewUrl = URL.createObjectURL(blob);
          onApplyCrop(file, previewUrl);
          setIsProcessing(false);
          onClose();
        },
        "image/jpeg",
        0.92
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error generating cropped image");
      setIsProcessing(false);
    }
  }, [completedCrop, originalFileName, onApplyCrop, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cropper-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-[#0c1220] border border-white/12 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between shrink-0 bg-[#070a10]">
          <div>
            <h3 id="cropper-title" className="text-white font-bold text-base flex items-center gap-2">
              <Sparkles size={16} className="text-[var(--site-accent)]" />
              Standardize Profile Photo (1:1 Ratio)
            </h3>
            <p className="text-xs text-white/50 mt-0.5">
              Crop and center the scholar portrait to 512×512px to guarantee zero layout shift.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close cropper"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col md:flex-row gap-6 items-center md:items-start justify-center">
          {/* Main Cropper viewport */}
          <div className="flex-1 w-full flex flex-col items-center">
            <div className="relative max-h-[380px] w-full flex items-center justify-center bg-black/60 rounded-xl overflow-hidden border border-white/8 p-2">
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1}
                circularCrop={false}
                keepSelection
                className="max-h-[350px] shadow-lg"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imgRef}
                  alt="Crop preview source"
                  src={imageSrc}
                  style={{
                    transform: `scale(${scale})`,
                    maxHeight: "350px",
                    maxWidth: "100%",
                    objectFit: "contain",
                    transition: "transform 0.1s ease-out",
                  }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            </div>

            {/* Zoom & Adjustment Controls */}
            <div className="w-full mt-4 flex items-center gap-4 bg-white/4 border border-white/8 rounded-xl px-4 py-2.5">
              <span className="text-xs text-white/60 font-medium flex items-center gap-1.5 shrink-0">
                <ZoomIn size={14} className="text-[var(--site-accent)]" /> Zoom:
              </span>
              <button
                type="button"
                onClick={() => setScale((s) => Math.max(0.8, Number((s - 0.1).toFixed(2))))}
                className="p-1 rounded text-white/60 hover:text-white hover:bg-white/10"
                title="Zoom out"
              >
                <ZoomOut size={14} />
              </button>
              <input
                type="range"
                min="0.8"
                max="2.5"
                step="0.05"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full accent-[var(--site-accent)] cursor-pointer h-1.5 bg-white/10 rounded-lg"
              />
              <button
                type="button"
                onClick={() => setScale((s) => Math.min(2.5, Number((s + 0.1).toFixed(2))))}
                className="p-1 rounded text-white/60 hover:text-white hover:bg-white/10"
                title="Zoom in"
              >
                <ZoomIn size={14} />
              </button>
              <span className="text-xs font-mono text-white/50 w-10 text-right">
                {Math.round(scale * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setScale(1)}
                className="p-1 rounded text-white/40 hover:text-white hover:bg-white/10 ml-1"
                title="Reset zoom"
              >
                <RotateCcw size={13} />
              </button>
            </div>
          </div>

          {/* Sidebar: Live Output Previews */}
          <div className="w-full md:w-56 shrink-0 flex flex-col items-center bg-[#070a10]/80 border border-white/8 rounded-xl p-4 text-center">
            <h4 className="text-xs font-bold text-white/80 uppercase tracking-wider mb-3">
              Standardized Output
            </h4>

            {/* Hidden canvas for processing */}
            <canvas ref={previewCanvasRef} className="hidden" />

            {/* Square Card Preview */}
            <div className="relative w-36 h-36 rounded-xl overflow-hidden border-2 border-[var(--site-accent)]/50 shadow-xl bg-black/50 mx-auto mb-2">
              {previewCanvasUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewCanvasUrl}
                  alt="Square preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-white/40">
                  Preview
                </div>
              )}
              <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-mono bg-black/80 text-white/80 border border-white/10">
                512×512
              </div>
            </div>
            <p className="text-[11px] text-white/50 mb-4">Directory Card (1:1)</p>

            {/* Circular Avatar Preview */}
            <div className="w-14 h-14 rounded-full overflow-hidden border border-white/20 shadow-md bg-black/50 mx-auto mb-1">
              {previewCanvasUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewCanvasUrl}
                  alt="Round preview"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <p className="text-[10px] text-white/40 mb-2">Table / Badge</p>

            <div className="mt-auto pt-3 border-t border-white/8 w-full text-[11px] text-emerald-400 font-medium flex items-center justify-center gap-1">
              <Check size={12} /> Aspect Ratio Locked
            </div>
          </div>
        </div>

        {error && (
          <div className="px-6 py-2 bg-red-500/10 border-t border-red-500/20 text-red-300 text-xs flex items-center gap-2 shrink-0">
            <ShieldAlert size={14} />
            {error}
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/8 flex items-center justify-between shrink-0 bg-[#070a10]">
          <span className="text-xs text-white/40">
            Output: <strong className="text-white/70">512×512px High-Quality JPEG</strong>
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-white/5 hover:bg-white/10 text-white/70 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={isProcessing || !completedCrop}
              className="btn-primary py-2 px-5 text-xs flex items-center gap-2"
            >
              <Check size={14} />
              {isProcessing ? "Processing…" : "Confirm 1:1 Photo"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
