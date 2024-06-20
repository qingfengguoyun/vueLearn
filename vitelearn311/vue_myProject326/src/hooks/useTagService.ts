import { type Ref,ref, computed, onMounted } from "vue";
import type { Tag,TagQueryPojo } from "@/types";
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

    // 修改tag选中状态，通过下标
    function selectTag(index:number){
        tags.value[index].isSelected=!tags.value[index].isSelected;
        if(tags.value[index].isSelected==true){
            selectedTags.value.push(tags.value[index]);
        }else{
            selectedTags.value=selectedTags.value.filter(t=>t.id!=tags.value[index].id);
        }
    }

    // 修改tag选中状态，通过id
    function selectTagById(tagId:string){
        tags.value.forEach(t=>{
            if(t.id==tagId){
                t.isSelected=!t.isSelected;
            }
        })
        // selectedTags.value=tags.value.filter(t=>t.isSelected)
    }

    function clearSelectTag(){
        console.log("clearSelectTag")
        tags.value.forEach((t)=>t.isSelected=false);
        // 使用splice清空数组，同时保留对原数组的引用
        // array.splice(start: number, deleteCount: number, ...items: T[]): T[]
        // start: 表示从哪个索引位置开始操作。
        // deleteCount: 表示要删除多少个元素。如果未设置则默认删除到数组末尾。
        // ...items: 可选，表示要添加到数组中的新元素。
        selectedTags.value.splice(0,selectedTags.value.length);
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
        clearSelectTag,
        selectTagById,
    }
}