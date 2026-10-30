export function DogPhoto({
  titleId,
  available,
  onError,
}: {
  titleId: string;
  available: boolean;
  onError: () => void;
}) {
  return (
    <div className="dog-photo-content">
      <h2 id={titleId}>My dog.</h2>
      <p className="dog-dev-note">
        My paw-gramming partner, always on bug-sniffing duty.
      </p>
      {available ? (
        <img src="/dog.png" alt="Darren’s dog" onError={onError} />
      ) : (
        <div className="dog-photo-placeholder">
          <strong>The photo could not load.</strong>
          <p>Please try reloading the page.</p>
        </div>
      )}
    </div>
  );
}
