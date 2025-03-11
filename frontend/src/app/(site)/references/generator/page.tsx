import { getAllReferenceTags } from "@/api/references";
import { requestWithReturn } from "@/helpers/functions/requestWithReturn";
import GeneratorForm from "./GeneratorForm";
import { TReferenceTags } from "@shared/types/reference";

const GeneratorPage = async () => {
  const referenceTags = await requestWithReturn<undefined, TReferenceTags>(
    getAllReferenceTags,
    undefined,
  )
  return (
    <GeneratorForm referenceTags={referenceTags} />
  )
};

export default GeneratorPage;
