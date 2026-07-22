import ear from "../assets/mascot-ellipse-ear.svg";
import earInner from "../assets/mascot-ellipse-ear-inner.svg";
import face from "../assets/mascot-face.svg";
import eye from "../assets/mascot-eye.svg";
import eyePupil from "../assets/mascot-eye-pupil.svg";
import nose from "../assets/mascot-nose.svg";
import cheek from "../assets/mascot-cheek.svg";

export default function Mascot({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-[112px] w-[104px] ${className}`}>
      <img alt="" src={ear} className="absolute left-[12px] top-[2px] h-[32px] w-[27px]" />
      <img alt="" src={ear} className="absolute left-[65px] top-[2px] h-[32px] w-[27px]" />
      <img alt="" src={earInner} className="absolute left-[18px] top-[8px] h-[19px] w-[14px]" />
      <img alt="" src={earInner} className="absolute left-[71px] top-[8px] h-[19px] w-[14px]" />
      <img alt="" src={face} className="absolute left-[2px] top-[18px] h-[94px] w-[100px]" />
      <img alt="" src={eye} className="absolute left-[32px] top-[54px] h-[9px] w-[8px]" />
      <img alt="" src={eyePupil} className="absolute left-[35px] top-[56px] size-[2.5px]" />
      <img alt="" src={eye} className="absolute left-[62px] top-[54px] h-[9px] w-[8px]" />
      <img alt="" src={eyePupil} className="absolute left-[65px] top-[56px] size-[2.5px]" />
      <img alt="" src={nose} className="absolute left-[47px] top-[68px] h-[5px] w-[9px]" />
      <img alt="" src={cheek} className="absolute left-[18px] top-[72px] h-[7px] w-[12px]" />
      <img alt="" src={cheek} className="absolute left-[72px] top-[72px] h-[7px] w-[12px]" />
    </div>
  );
}
