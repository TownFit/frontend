import DescriptionField from "./DescriptionField";
import InfoBox from "../home/InfoBox";

function DescriptionBox() {

    const description = [
        {
            title: "1. 병원이 가까운 동네",
            description: (
                <>
                    응급상황에도 안심! 건강을 지키는 데 중요한 <br />
                    의료 인프라가 근처에 있어요.
                </>
            )
        },
        {
            title: "2. 중학교가 가까운 동네",
            description: (
                <>
                    아이들 통학이 편리하고,<br />
                    교육 환경도 우수한 지역이에요.
                </>
            )
        },
        {
            title: "3. 공원이 가까운 동네",
            description: (
                <>
                    여유로운 산책과 가족 나들이에 딱!<br />
                    쾌적한 자연환경이 삶의 질을 높여줘요.
                </>
            )
        }
    ];

    return (
        <div className="">
            <InfoBox
                title={description[0].title}
                description={description[0].description}
            />
            <InfoBox
                title={description[1].title}
                description={description[1].description}
            />
            <InfoBox
                title={description[2].title}
                description={description[2].description}
            />
        </div>
    )
}
export default DescriptionBox;