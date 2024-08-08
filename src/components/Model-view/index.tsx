import * as THREE from "three";
import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import Lights from "../Lights";
//@ts-expect-error: unknown error
import IPhone from "../IPhone";
import { Dispatch, SetStateAction, Suspense } from "react";
import Loader from "../Loader";

const ModelView = ({
    index,
    groupRef,
    gsapType,
    controlRef,
    setRotationState,
    item,
    size,
}: {
    index: number;
    groupRef: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
    gsapType: string;
    controlRef: React.MutableRefObject<null>;
    setRotationState: Dispatch<SetStateAction<number>>;
    item: {
        title: string;
        color: string[];
        img: string;
    };
    size: string;
}) => {
    return (
        <View
            index={index}
            id={gsapType}
            className={`w-full h-full absolute ${
                index === 2 ? "right-[-100%]" : ""
            }`}
        >
            <ambientLight intensity={0.3} />
            <PerspectiveCamera makeDefault position={[0, 0, 4]} />
            <Lights />
            <OrbitControls
                ref={controlRef}
                makeDefault
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.4}
                target={new THREE.Vector3(0, 0, 0)}
                onEnd={() =>
                    //@ts-expect-error: unknown error
                    setRotationState(controlRef.current.getAzimuthalAngle())
                }
            />
            <group
                ref={groupRef}
                name={`${index === 1} ? 'small' : 'large`}
                position={[0, 0, 0]}
            >
                <Suspense fallback={<Loader />}>
                    <IPhone
                        scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
                        item={item}
                        size={size}
                    />
                </Suspense>
            </group>
        </View>
    );
};

export default ModelView;
