import santaLoadingImage from "../images/santa_loading.gif";

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <img src={santaLoadingImage} alt="Santa loading" />
    </div>
  )
}