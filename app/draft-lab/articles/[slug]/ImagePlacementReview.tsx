"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";

import { ImageDecisionControls } from "./ImageDecisionControls";
import { ImageRequestForm } from "./ImageRequestForm";
import type { ImageRequest } from "./ImageRequestForm";

type GeneratedInteriorImage = {
  id: string;
  placementId: string;
  variantId: string;
  role: string;
  altText?: string;
  caption?: string;
  publicPath: string;
  sourcePath: string;
  status: string;
  checksum?: string;
};

type GeneratedImageRequest = ImageRequest;

type GeneratedInteriorPlacement = {
  id: string;
  heading: string;
  selected: boolean;
  images: GeneratedInteriorImage[];
  requests: GeneratedImageRequest[];
};

type Props = {
  slug: string;
  candidateTitle: string;
  placement: GeneratedInteriorPlacement;
  returnTo: string;
};

export function ImagePlacementReview({
  slug,
  candidateTitle,
  placement: initialPlacement,
  returnTo,
}: Props) {
  const [placement, setPlacement] = useState<GeneratedInteriorPlacement>(initialPlacement);
  const [logMessage, setLogMessage] = useState("");

  const placementReturnTo = `${returnTo}#image-set-${placement.id}`;
  const [isRefreshing, setIsRefreshing] = useState(false);

  const hasChoices = placement.images.length > 0;

  const refreshPlacementState = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch(
        `/api/draft-lab/placement-state?slug=${encodeURIComponent(
          slug,
        )}&placementId=${encodeURIComponent(placement.id)}`,
        {
          headers: { Accept: "application/json" },
          cache: "no-store",
        },
      );

      const payload = (await response.json()) as {
        ok?: boolean;
        images?: GeneratedInteriorImage[];
        requests?: GeneratedImageRequest[];
      };

      if (!response.ok || !payload.ok) {
        setLogMessage("Could not refresh image set from draft lab.");
        return;
      }

      setPlacement((current) => ({
        ...current,
        images: payload.images ?? current.images,
        requests: payload.requests ?? current.requests,
        selected:
          (payload.images ?? current.images).some(
            (image) => image.status === "approved-selected",
          ) || false,
      }));
      setLogMessage("Image set refreshed from worker output.");
    } catch {
      setLogMessage("Could not refresh image set from draft lab.");
    } finally {
      setIsRefreshing(false);
    }
  }, [placement.id, slug]);

  useEffect(() => {
    void refreshPlacementState();
  }, [refreshPlacementState]);

  const handleDecision = (message: string) => {
    setLogMessage(message);
  };

  const handleDecisionForImage = async (
    assetId: string,
    decision: "approve" | "reject",
    status: string,
  ) => {
    if (status !== "ok") return;

    setPlacement((current) => applyImageDecision(current, assetId, decision));
    handleDecision(
      decision === "approve"
        ? "Selection saved. Refreshing from server..."
        : "Selection updated. Refreshing from server...",
    );
    await refreshPlacementState();
  };

  const handleRequestsUpdated = (requests: GeneratedImageRequest[]) => {
    setPlacement((current) => ({ ...current, requests }));
  };

  const handleCompleted = () => {
    setLogMessage("Image generated. Refreshing image set...");
    void refreshPlacementState();
  };

  return (
    <section id={`image-set-${placement.id}`} style={styles.placementReview}>
      <div style={styles.placementHeader}>
        <p style={styles.placementKicker}>Image set · {placement.id}</p>
        <h3 style={styles.placementTitle}>{placement.heading}</h3>
        {placement.selected ? (
          <span style={styles.selectedBadge}>Selected</span>
        ) : (
          <span style={styles.reviewBadge}>
            {placement.images.length} choices
          </span>
        )}
      </div>
      <p style={styles.placementHelp}>
        {hasChoices
          ? "Choose the image that best supports this section. Selected images are highlighted; unselected images remain visible for comparison."
          : "Generate at least one image to start choosing this placement."}
      </p>
      {logMessage ? <p style={styles.requestMessage}>{logMessage}</p> : null}
      <div style={styles.generatedGrid}>
        {placement.images.map((image) => (
          <figure key={image.id} style={imageCardStyle(image.status)}>
            <div style={styles.controlsRow}>
              <ImageDecisionControls
                slug={slug}
                assetId={image.id}
                variantId={image.variantId}
                returnTo={placementReturnTo}
                onDecision={(_, decision, status) =>
                  void handleDecisionForImage(_, decision, status)
                }
              />
            </div>
            <a href={draftLabGeneratedImageUrl(image)} style={styles.generatedImageLink}>
              <img
                src={draftLabGeneratedImageUrl(image)}
                alt={image.altText ?? `${candidateTitle} generated art`}
                style={styles.generatedImage}
                loading="lazy"
              />
            </a>
            <figcaption style={styles.generatedCaption}>
              <strong>{image.variantId}</strong>
              <span>{image.caption ?? "No caption drafted yet."}</span>
              <code>{image.status}</code>
            </figcaption>
            <ImageRequestForm
              slug={slug}
              placementId={placement.id}
              heading={placement.heading}
              returnTo={placementReturnTo}
              initialRequests={placement.requests.filter(
                (request) => request.sourceAssetId === image.id,
              )}
              sourceAssetId={image.id}
              sourceVariantId={image.variantId}
              sourceImageUrl={draftLabGeneratedImageUrl(image)}
              compact
              onRequestsUpdated={handleRequestsUpdated}
              onCompleted={handleCompleted}
              onMessage={setLogMessage}
            />
          </figure>
        ))}
      </div>
      {isRefreshing ? <p style={styles.requestMessage}>Refreshing image options.</p> : null}
      <ImageRequestForm
        slug={slug}
        placementId={placement.id}
        heading={placement.heading}
        returnTo={placementReturnTo}
        initialRequests={placement.requests}
        onRequestsUpdated={handleRequestsUpdated}
        onCompleted={handleCompleted}
        onMessage={setLogMessage}
      />
    </section>
  );
}

function draftLabGeneratedImageUrl(image: GeneratedInteriorImage) {
  return `/api/draft-lab/generated-image?path=${encodeURIComponent(
    image.publicPath,
  )}`;
}

function imageCardStyle(status: string): CSSProperties {
  if (status === "approved-selected") {
    return {
      ...styles.generatedCard,
      ...styles.selectedGeneratedCard,
    };
  }

  if (status === "rejected-not-selected" || status === "rejected-by-david") {
    return {
      ...styles.generatedCard,
      ...styles.rejectedGeneratedCard,
    };
  }

  return styles.generatedCard;
}

function applyImageDecision(
  current: GeneratedInteriorPlacement,
  assetId: string,
  decision: "approve" | "reject",
): GeneratedInteriorPlacement {
  const images = current.images.map((image) => {
    if (image.id === assetId) {
      return {
        ...image,
        status:
          decision === "approve"
            ? "approved-selected"
            : "rejected-by-david",
      };
    }

    if (decision === "approve") {
      return {
        ...image,
        status:
          image.status === "approved-selected"
            ? "rejected-not-selected"
            : image.status,
      };
    }

    return image;
  });

  return {
    ...current,
    images,
    selected: images.some((image) => image.status === "approved-selected"),
  };
}

const styles: Record<string, CSSProperties> = {
  placementReview: {
    display: "grid",
    gap: "12px",
    padding: "14px",
    border: "1px solid #e2d8c9",
    borderRadius: "12px",
    background: "#f4eadb",
  },
  placementHeader: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    gap: "8px 14px",
    alignItems: "center",
  },
  placementKicker: {
    gridColumn: "1 / -1",
    margin: 0,
    color: "#7d5b2f",
    fontSize: "0.74rem",
    fontWeight: 900,
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  placementTitle: {
    margin: 0,
    fontSize: "1.24rem",
    lineHeight: 1.12,
  },
  selectedBadge: {
    padding: "6px 8px",
    borderRadius: "999px",
    background: "#245f3d",
    color: "#fffaf1",
    fontSize: "0.72rem",
    fontWeight: 900,
    textTransform: "uppercase",
  },
  reviewBadge: {
    padding: "6px 8px",
    borderRadius: "999px",
    background: "#4451a4",
    color: "#fffaf1",
    fontSize: "0.72rem",
    fontWeight: 900,
    textTransform: "uppercase",
  },
  placementHelp: {
    margin: 0,
    color: "#3d352e",
    fontSize: "0.9rem",
    lineHeight: 1.45,
  },
  controlsRow: {
    minHeight: "34px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
  },
  requestMessage: {
    margin: 0,
    color: "#25346f",
    fontSize: "0.84rem",
    fontWeight: 800,
  },
  generatedGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "14px",
  },
  generatedCard: {
    display: "grid",
    gap: "10px",
    margin: 0,
    padding: "10px",
    border: "1px solid #e2d8c9",
    borderRadius: "10px",
    background: "#fffdf8",
  },
  selectedGeneratedCard: {
    border: "2px solid #245f3d",
    boxShadow: "0 0 0 3px rgba(36, 95, 61, 0.12)",
  },
  rejectedGeneratedCard: {
    opacity: 0.72,
    background: "#f7f0e7",
  },
  generatedImageLink: {
    display: "block",
    overflow: "hidden",
    borderRadius: "8px",
    background: "#120f0b",
  },
  generatedImage: {
    display: "block",
    width: "100%",
    aspectRatio: "16 / 9",
    objectFit: "contain",
  },
  generatedCaption: {
    display: "grid",
    gap: "6px",
    color: "#302b25",
    fontSize: "0.88rem",
    lineHeight: 1.38,
  },
};
