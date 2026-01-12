'use client';

import { CraftingStep } from '@/types';
import { Hammer, ChevronRight, Play } from 'lucide-react';

interface CraftingGuideProps {
  steps: CraftingStep[];
}

export function CraftingGuide({ steps }: CraftingGuideProps) {
  return (
    <div className="space-y-6">
      <div className="bg-[#141417] border border-[#3d3d43] p-6">
        <h2 className="text-2xl font-serif text-[#c5a059] mb-6 flex items-center gap-2">
          <Hammer size={24} />
          Crafting Guide - Best in Slot Items
        </h2>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-[#0c0c0e] border border-[#3d3d43] p-6 hover:border-[#c5a059] transition-colors"
            >
              <div className="flex items-start gap-6">
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-[#c5a059] text-black font-black text-2xl flex items-center justify-center">
                    {step.step}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-serif text-[#c5a059] mb-3">{step.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{step.description}</p>

                  {step.materials && step.materials.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-bold text-gray-400 uppercase mb-2">Required Materials:</h4>
                      <div className="flex flex-wrap gap-2">
                        {step.materials.map((material, matIndex) => (
                          <span
                            key={matIndex}
                            className="px-3 py-1 bg-[#141417] border border-[#3d3d43] text-sm text-gray-300"
                          >
                            {material}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {step.videoUrl && (
                    <button className="mt-4 px-4 py-2 bg-[#141417] border border-[#3d3d43] text-gray-300 hover:border-[#c5a059] hover:text-[#c5a059] transition-colors flex items-center gap-2 text-sm font-bold uppercase">
                      <Play size={16} />
                      Watch Video Guide
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
