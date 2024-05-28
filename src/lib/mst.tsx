// src/models/RootStore.ts
import { onSnapshot, applySnapshot, getSnapshot, IStateTreeNode, IType, ModelSnapshotType, ModelProperties } from "mobx-state-tree";
// import { Exam, ExamQuestion, ExamQuestionItem } from '../../../models'
import { createContext, useContext } from "react";
// import ExamJson from './exam.json'
import {  observable, action } from "mobx";
// import { includes } from 'lodash'


export function createMstStore<S extends ModelProperties>(store: IStateTreeNode<IType<any, ModelSnapshotType<S>, any>>) {

    const StoreContext = createContext(store);
    const useStore = () => {
        return useContext(StoreContext);
    }
    const StoreProvider = ({ children }: any) => {
        return (
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        )
    }

    // 保存状态快照的数组
    const snapshots: any[] = [getSnapshot(store)];
    let currentIndex = 0;


    const snapShopState = observable({
        hasUndo: false,
        hasRedo: false
    });

    // 更新撤销/重做状态
   const updateUndoRedoState = action(function () {
   
            snapShopState.hasUndo = currentIndex > 0;
            snapShopState.hasRedo = currentIndex < snapshots.length - 1;

    })
    // 用于控制 onSnapshot 监听的布尔标志
    let shouldTrackSnapshot = true;

    // 监听状态快照的变化
    onSnapshot(store, snapshot => {
        if (shouldTrackSnapshot) {

            if (currentIndex === snapshots.length - 1) {
                snapshots.push(snapshot);
                currentIndex++;
            } else {
                snapshots.splice(currentIndex + 1);
                snapshots.push(snapshot);
                currentIndex++;
            }
            updateUndoRedoState();
        }

    });

    // 撤销功能
    function undo() {
        if (currentIndex > 0) {
            currentIndex--;
            shouldTrackSnapshot = false; // 禁用快照跟踪
            applySnapshot(store, snapshots[currentIndex]);
            shouldTrackSnapshot = true
        }
        updateUndoRedoState();
    }

    // 重做功能
    function redo() {
        if (currentIndex < snapshots.length - 1) {
            currentIndex++;
            shouldTrackSnapshot = false; // 禁用快照跟踪
            applySnapshot(store, snapshots[currentIndex]);
            shouldTrackSnapshot = true
        }
        updateUndoRedoState();
    }


    return {
        useStore,
        StoreProvider,
        undo,
        redo,
        snapShopState
    }




}


