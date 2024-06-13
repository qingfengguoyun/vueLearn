import { type Ref,ref, computed, onMounted } from "vue";
import type { Tag } from "@/types";
import { postRequest } from "@/utils/axiosUtils";
import type { ResultInter } from "@/types/ResultType";
export default function(){
    // 全部Tags
    let tags:Ref<Tag[]>=ref([])
    // 条件查询：tagName
    let queryTagName:Ref<string>=ref("")
    // 选中的tags
    let selectedTags:Ref<Tag[]>=ref([])
    // 条件查询：isBasic
    let isBasic:Ref<boolean>=ref(true)

    let selectedTagIds=computed(()=>{
        return selectedTags.value.map(t=>t.id)
    })

    interface TagQueryPojo{
        isBasic?:boolean,
        tagName?:string
    }

    async function queryTagsByCondition(){
        let pojo:TagQueryPojo={
            isBasic:isBasic.value,
            tagName:queryTagName.value,
        }
        let res=await postRequest<ResultInter>("/api/tag/queryAllTagsByConditions",pojo);
        if(res.data.code==200){
            console.log("tag查询成功")
            tags.value=res.data.data;
        }else{
            console.log("tag查询失败")
        }
    }

    function selectTag(index:number){
        tags.value[index].isSelected=!tags.value[index].isSelected;
        if(tags.value[index].isSelected==true){
            selectedTags.value.push(tags.value[index]);
        }else{
            selectedTags.value=selectedTags.value.filter(t=>t.id!=tags.value[index].id);
        }
    }

    onMounted(()=>{
        queryTagsByCondition();
    })

    return{
        tags,
        queryTagName,
        selectedTags,
        isBasic,
        selectedTagIds,
        queryTagsByCondition,
        selectTag,
    }
}